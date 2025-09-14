import os
import re
import datetime
import wikipediaapi
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup

# --- SCRAPER 1: WIKIPEDIA (API METHOD) ---
def scrape_wikipedia_page(page_title, output_filename):
    """
    Fetches and cleans content from Wikipedia using its official API.
    """
    print(f"-> [API] Fetching Wikipedia page: '{page_title}'")
    wiki_api = wikipediaapi.Wikipedia(
        language='en',
        user_agent='MyMentalHealthApp/1.0 (sih_project@example.com)',
        timeout=20
    )
    page = wiki_api.page(page_title)
    
    if not page.exists():
        print(f"  ❌ ERROR: Page '{page_title}' does not exist.")
        return

    full_text = page.text
    print(f"  ✅ Fetched content ({len(full_text)} characters).")

    # Clean text by removing sections after "See also" or "References"
    if '== See also ==' in full_text:
        cleaned_text = full_text.split('== See also ==')[0]
    else:
        cleaned_text = full_text.split('== References ==')[0]

    cleaned_text = re.sub(r'\n\s*\n', '\n\n', cleaned_text).strip()
    
    final_content = f"Topic: {page_title.replace('_', ' ')}\n\n{cleaned_text}"
    with open(output_filename, 'w', encoding='utf-8') as f:
        f.write(final_content)
    print(f"  ✅ Success! Saved to {output_filename}")


# --- SCRAPER 2: WHO & OTHERS (SELENIUM METHOD) ---
def scrape_dynamic_page(url, output_filename, topic_title):
    """
    Uses Selenium to scrape JavaScript-heavy pages like the WHO website.
    """
    print(f"-> [Selenium] Fetching dynamic page: {url}")
    service = Service(ChromeDriverManager().install())
    options = webdriver.ChromeOptions()
    options.add_argument('--headless')
    options.add_argument('--log-level=3')
    options.add_argument('user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36')
    driver = webdriver.Chrome(service=service, options=options)

    try:
        driver.get(url)
        # This target class is specific to WHO fact sheets.
        # You may need to add more logic here for other types of sites.
        target_class = "sf-detail-body-wrapper"
        wait = WebDriverWait(driver, 20)
        wait.until(EC.presence_of_element_located((By.CLASS_NAME, target_class)))
        print("  ✅ Page content container located.")

        article_element = driver.find_element(By.CLASS_NAME, target_class)
        html_content = article_element.get_attribute('innerHTML')
        soup = BeautifulSoup(html_content, 'html.parser')
        text = soup.get_text(separator='\n', strip=True)
        cleaned_text = re.sub(r'\n\s*\n', '\n\n', text)
        
        final_content = f"Topic: {topic_title}\n\n{cleaned_text}"
        with open(output_filename, 'w', encoding='utf-8') as f:
            f.write(final_content)
        print(f"  ✅ Success! Saved to {output_filename}")

    except Exception as e:
        print(f"  ❌ An error occurred while scraping {url}: {e}")
    finally:
        driver.quit()


# --- MAIN EXECUTION LOGIC ---
if __name__ == "__main__":
    URLS_FILE = "url_list.txt"
    OUTPUT_DIR = "knowledge_base"
    # 1. Define a path for the log file to track scraped URLs
    PROCESSED_LOG = os.path.join(OUTPUT_DIR, "scraped_urls.log")

    os.makedirs(OUTPUT_DIR, exist_ok=True)

    # 2. Load the set of already scraped URLs from the log file
    scraped_urls = set()
    try:
        with open(PROCESSED_LOG, 'r') as f:
            scraped_urls = {line.strip() for line in f}
        print(f"Loaded {len(scraped_urls)} previously scraped URLs.")
    except FileNotFoundError:
        print("Log file not found. Assuming first run.")

    # Read all target URLs from the list
    try:
        with open(URLS_FILE, 'r') as f:
            all_urls = {line.strip() for line in f if line.strip() and not line.startswith('#')}
    except FileNotFoundError:
        print(f"ERROR: The file '{URLS_FILE}' was not found. Please create it.")
        exit()

    # 3. Determine which URLs are new by finding the difference
    urls_to_process = list(all_urls - scraped_urls)

    if not urls_to_process:
        print("\n✅ Knowledge base is up to date. No new URLs to scrape.")
        exit()

    print(f"\nFound {len(urls_to_process)} new URLs to process.\n")
    
    successfully_processed = []
    for url in urls_to_process:
        try:
            # 4. Implement the new formatted filename logic
            slug = (url.split('/')[-1] or url.split('/')[-2]).split('?')[0] # Clean up slug
            date_stamp = datetime.datetime.now().strftime("%Y-%m-%d")
            
            domain = "other"
            if "wikipedia.org" in url:
                domain = "wikipedia"
            elif "who.int" in url:
                domain = "who"

            output_filename = f"{date_stamp}_{domain}_{slug}.txt"
            output_filepath = os.path.join(OUTPUT_DIR, output_filename)
            topic_title = slug.replace('_', ' ').replace('-', ' ').title()
            
            print(f"Processing: {url}")
            print(f"-> Saving as: {output_filename}")

            success = False # Flag to track if scraping worked
            if domain == "wikipedia":
                # NOTE: Your scraping functions should return True on success
                scrape_wikipedia_page(slug, output_filepath)
                success = True 
            elif domain == "who":
                scrape_dynamic_page(url, output_filepath, topic_title)
                success = True
            else:
                print(f"-> [Skipping] No scraper configured for this domain.")

            # 5. If scraping was successful, add the URL to our list for logging
            if success:
                successfully_processed.append(url)
                print(f"-> Success!")
            
            print("-" * 20)

        except Exception as e:
            print(f"-> A critical error occurred processing URL {url}: {e}")
            print("-" * 20)
    
    # 6. After the loop, append all newly scraped URLs to the log file
    if successfully_processed:
        with open(PROCESSED_LOG, "a") as f:
            for url in successfully_processed:
                f.write(f"{url}\n")
        print(f"\nUpdated log file with {len(successfully_processed)} new URLs.")
    
    print("\nScraping process finished.")
