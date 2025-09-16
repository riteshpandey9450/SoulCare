import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, BookOpen, Headphones } from 'lucide-react';

const ResourcePage = () => {
  // User language preference (simulated as English for this demo)
  const [language, setLanguage] = useState('english');
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('mental-health');
  const [selectedType, setSelectedType] = useState('video');
  
  // Slider state
  const [currentSlide, setCurrentSlide] = useState(0);

  // Content data with bilingual support
  const content = {
    'mental-health': {
      video: {
        english: [
          {
            id: 1,
            image: 'https://i.ytimg.com/vi/rkZl2gsLUp4/hq720.jpg?sqp=-oaymwFBCNAFEJQDSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AH-CYAC0AWKAgwIABABGGUgWihLMA8=&rs=AOn4CLBjtrde2fKZRHi5MBkKs2pfdvijsw',
            image1:'https://www.youtube.com/embed/rkZl2gsLUp4?si=6E1f6uncbIuomeMI&amp;start=1',

            heading: 'Mindful Meditation Basics',
            paragraph: 'Learn the fundamentals of mindfulness meditation to reduce stress and improve mental clarity.',
            buttonText: 'Watch Now'
          },
          {
            id: 2,
            image: 'https://i.ytimg.com/vi/wOGqlVqyvCM/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCI20A5q8zI3uoIVvR4HkcnetB9Tw',
            image1:'https://www.youtube.com/embed/wOGqlVqyvCM?si=AYHbSIflGiBWdBGz',
            heading: 'Breathing Techniques',
            paragraph: 'Master powerful breathing exercises that can instantly calm your mind and body.',
            buttonText: 'Watch Now'
          },
          {
            id: 3,
            image: 'https://i.ytimg.com/vi/G0XUimJbz44/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAqSnF3JnqndDlcKcbiRExqx_59lg',
            image1:'https://www.youtube.com/embed/G0XUimJbz44?si=77US_cj0B-RFNHl3',
            heading: 'Anxiety Management',
            paragraph: 'Discover practical strategies to manage anxiety and build emotional resilience.',
            buttonText: 'Watch Now'
          },
          {
            id: 4,
            image: 'https://i.ytimg.com/vi/TLKxdTmk-zc/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAEQv0zJX-1cVRW1dmKKpchninb3w',
            image1:'https://www.youtube.com/embed/TLKxdTmk-zc?si=MZsDTgbPKChB4MGM',
            heading: 'Anxiety Management',
            paragraph: 'Discover practical strategies to manage anxiety and build emotional resilience.',
            buttonText: 'Watch Now'
          },
          {
            id: 5,
            image: 'https://i.ytimg.com/vi/22wpwgpy7fY/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDQZDHNxWB4Yg29a0kNjR4Q3oCdqA',
            image1:'https://www.youtube.com/embed/22wpwgpy7fY?si=C0Oa_i3oqz_Er255',
            heading: 'Anxiety Management',
            paragraph: 'Discover practical strategies to manage anxiety and build emotional resilience.',
            buttonText: 'Watch Now'
          }
        ],
        hindi: [
          {
            id: 1,
            image: 'https://i.ytimg.com/vi/yI_txg4AZNI/hqdefault.jpg?sqp=-oaymwEnCOADEI4CSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLC0Ys1I7NlaxLsVeU_Fs8A72G5bJg',
            image1:'https://www.youtube.com/embed/yI_txg4AZNI?si=f-j55DDPUQ8UujUR',
            heading: 'माइंडफुल मेडिटेशन की मूल बातें',
            paragraph: 'तनाव कम करने और मानसिक स्पष्टता में सुधार के लिए माइंडफुलनेस मेडिटेशन की बुनियादी बातें सीखें।',
            buttonText: 'अभी देखें'
          },
          {
            id: 2,
            image: 'https://i.ytimg.com/vi/m1RGFegL83c/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAK9nWEHb_mvXWAByd-TmlBBaJuog',
            image1:'https://www.youtube.com/embed/m1RGFegL83c?si=crzayJXVVliX5CQR',
            heading: 'श्वास तकनीकें',
            paragraph: 'शक्तिशाली श्वास अभ्यासों में महारत हासिल करें जो तुरंत आपके मन और शरीर को शांत कर सकते हैं।',
            buttonText: 'अभी देखें'
          },
          {
            id: 3,
            image: 'https://i.ytimg.com/vi/d1sVO6x9p5U/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDr91I6WaAyE3JIZkLTD0Y_hwntRA',
            image1:'https://www.youtube.com/embed/d1sVO6x9p5U?si=-CVCm6rWXAYrguQy',
            heading: 'चिंता प्रबंधन',
            paragraph: 'चिंता का प्रबंधन करने और भावनात्मक लचीलापन बनाने की व्यावहारिक रणनीतियों की खोज करें।',
            buttonText: 'अभी देखें'
          },
          {
            id: 4,
            image: 'https://i.ytimg.com/vi/JmOBM160jZ0/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAGrY3Fm3sPRdbOQdc_0oNBRna4qQ',
            image1:'https://www.youtube.com/embed/JmOBM160jZ0?si=9HARqpSsgqI88qOr',
            heading: 'चिंता प्रबंधन',
            paragraph: 'शक्तिशाली श्वास अभ्यासों में महारत हासिल करें जो तुरंत आपके मन और शरीर को शांत कर सकते हैं।',
            buttonText: 'अभी देखें'
          }

        ]
      },
      audio: {
        english: [
          {
            id: 1,
            image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop',
            image1:'',
            heading: 'Sleep Stories Collection',
            paragraph: 'Relaxing bedtime stories designed to help you drift into peaceful sleep.',
            buttonText: 'Listen Now'
          },
          {
            id: 2,
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop',
            image1:'',
            heading: 'Guided Meditation',
            paragraph: 'Professional-led meditation sessions for stress relief and inner peace.',
            buttonText: 'Listen Now'
          }
        ],
        hindi: [
          {
            id: 1,
            image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop',
            image1:'https://www.youtube.com/embed/G0XUimJbz44?si=IhJz_Zs13QglVlOc',
            heading: 'नींद की कहानियों का संग्रह',
            paragraph: 'आरामदायक सोने की कहानियां जो आपको शांतिपूर्ण नींद में मदद करने के लिए डिज़ाइन की गई हैं।',
            buttonText: 'अभी सुनें'
          },
          {
            id: 2,
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop',
            image1:'',
            heading: 'निर्देशित ध्यान',
            paragraph: 'तनाव राहत और आंतरिक शांति के लिए पेशेवर-नेतृत्व वाले ध्यान सत्र।',
            buttonText: 'अभी सुनें'
          }
        ]
      },
      blog: {
        english: [
          {
            id: 1,
            image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop',
            image1:'',
            heading: '10 Daily Habits for Mental Wellness',
            paragraph: 'Simple yet effective daily practices that can transform your mental health journey.',
            buttonText: 'Read More'
          },
          {
            id: 2,
            image: 'https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=400&h=250&fit=crop',
            image1:'',
            heading: 'Understanding Depression',
            paragraph: 'A comprehensive guide to recognizing, understanding, and managing depression.',
            buttonText: 'Read More'
          }
        ],
        hindi: [
          {
            id: 1,
            image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop',
            image1:'',
            heading: 'मानसिक स्वास्थ्य के लिए 10 दैनिक आदतें',
            paragraph: 'सरल लेकिन प्रभावी दैनिक प्रथाएं जो आपकी मानसिक स्वास्थ्य यात्रा को बदल सकती हैं।',
            buttonText: 'और पढ़ें'
          },
          {
            id: 2,
            image: 'https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=400&h=250&fit=crop',
            image1:'',
            heading: 'अवसाद को समझना',
            paragraph: 'अवसाद को पहचानने, समझने और प्रबंधित करने के लिए एक व्यापक गाइड।',
            buttonText: 'और पढ़ें'
          }
        ]
      }
    },
    'fitness': {
      video: {
        english: [
          {
            id: 1,
            image: 'https://i.ytimg.com/vi/_8djNYprRDI/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBLNm0rCmUSFJLl_P3SyAtBiQHZwg',
            image1:'https://www.youtube.com/embed/_8djNYprRDI?si=LX_qSx5Ml0zmKcSy',
            heading: 'Morning Yoga Flow',
            paragraph: 'Start your day with energizing yoga sequences to boost flexibility and strength.',
            buttonText: 'Watch Now'
          },
          {
            id: 2,
            image: 'https://i.ytimg.com/vi/wIynl3at0Rs/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBMm9YRKk9lQX0f2I6LEv7-RdHrmg',
            image1:'https://www.youtube.com/embed/wIynl3at0Rs?si=lCNV8z-Ng_jleukH',
            heading: '20 MINUTE FULL BODY WORKOUT',
            paragraph: 'High-intensity interval training for maximum results in minimum time.',
            buttonText: 'Watch Now'
          },
           {
            id: 3,
            image: 'https://i.ytimg.com/vi/6Fr3LlLe0V8/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCfpWw28VeGFsudwRQiRm6twjXS9g',
            image1:'https://www.youtube.com/embed/6Fr3LlLe0V8?si=csiKRNeQdEciMFtV',
            heading: '20 MINUTE FULL BODY WORKOUT',
            paragraph: 'High-intensity interval training for maximum results in minimum time.',
            buttonText: 'Watch Now'
          }

        ],
        hindi: [
          {
            id: 1,
            image: 'https://i.ytimg.com/vi/CM43AZaRXNw/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAmdqkz7sH2S6N6_8QGbN1RvOvL4A',
            image1:'https://www.youtube.com/embed/CM43AZaRXNw?si=HRcZPQk6tIQVb9hg',
            heading: 'सुबह का योग प्रवाह',
            paragraph: 'लचीलेपन और शक्ति को बढ़ाने के लिए ऊर्जावान योग अनुक्रमों के साथ अपना दिन शुरू करें।',
            buttonText: 'अभी देखें'
          },
          {
            id: 2,
            image: 'https://i.ytimg.com/vi/zghuACZGqoY/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAmo9UGr-z9VYoUpRtDCgpKXxJWiw',
            image1:'https://www.youtube.com/embed/zghuACZGqoY?si=OyhEAN3DxhFtNZsJ',
            heading: 'HIIT वर्कआउट की मूल बातें',
            paragraph: 'न्यूनतम समय में अधिकतम परिणामों के लिए उच्च-तीव्रता अंतराल प्रशिक्षण।',
            buttonText: 'अभी देखें'
          },
           {
            id: 2,
            image: 'https://i.ytimg.com/vi/GWVv_pGgGtY/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLD2MeW62rzdJ7ooxKkqIgHxYOS3FA',
            image1:'https://www.youtube.com/embed/GWVv_pGgGtY?si=xUQWs56gDFyUkbjv',
            heading: 'वर्कआउट की मूल बातें',
            paragraph: 'अधिकतम परिणामों के लिए उच्च-तीव्रता अंतराल प्रशिक्षण।',
            buttonText: 'अभी देखें'
          }
        ]
      },
      audio: {
        english: [
          {
            id: 1,
            image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=250&fit=crop',
            image1:'',
            heading: 'Workout Motivation Mix',
            paragraph: 'High-energy audio sessions to keep you motivated during your fitness journey.',
            buttonText: 'Listen Now'
          }
        ],
        hindi: [
          {
            id: 1,
            image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=250&fit=crop',
            image1:'',
            heading: 'वर्कआउट प्रेरणा मिक्स',
            paragraph: 'आपकी फिटनेस यात्रा के दौरान आपको प्रेरित रखने के लिए उच्च-ऊर्जा ऑडियो सेशन।',
            buttonText: 'अभी सुनें'
          }
        ]
      },
      blog: {
        english: [
          {
            id: 1,
            image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=250&fit=crop',
            image1:'',
            heading: 'Nutrition Guide for Fitness',
            paragraph: 'Essential nutrition tips to fuel your workouts and optimize your health.',
            buttonText: 'Read More'
          }
        ],
        hindi: [
          {
            id: 1,
            image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=250&fit=crop',
            image1:'',
            heading: 'फिटनेस के लिए पोषण गाइड',
            paragraph: 'आपके वर्कआउट को बढ़ावा देने और आपके स्वास्थ्य को अनुकूलित करने के लिए आवश्यक पोषण सुझाव।',
            buttonText: 'और पढ़ें'
          }
        ]
      }
    },
    'motivation': {
      video: {
        english: [
          {
            id: 1,
            image: 'https://i.ytimg.com/vi/SGUY908Q6Ic/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBT5tYEFn6dzShPSbgcxzILT1lL0g',
            image1:'https://www.youtube.com/embed/SGUY908Q6Ic?si=ZCXiDUMxyimuBEmx',
            heading: 'Overcoming Challenges',
            paragraph: 'Inspiring stories and strategies to help you overcome life\'s biggest obstacles.',
            buttonText: 'Watch Now'
          },
          {
            id: 2,
            image: 'https://i.ytimg.com/vi/3gqQevdM7xM/hqdefault.jpg?sqp=-oaymwEnCOADEI4CSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDljR0uXSKjGsT-sglK5meYKHFV-g',
            image1:'https://www.youtube.com/embed/3gqQevdM7xM?si=unovVPnA5X7vNsLN',
            heading: 'Building Confidence',
            paragraph: 'Practical techniques to build unshakeable confidence and self-belief.',
            buttonText: 'Watch Now'
          },
          {
            id: 2,
            image: 'https://i.ytimg.com/vi/7sxpKhIbr0E/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLA_jAY7YhzFcE-ZBm0hbYcB14-5pQ',
            image1:'https://www.youtube.com/embed/7sxpKhIbr0E?si=-7DZ3ImGVZjeyvWG',
            heading: 'Self Motivation',
            paragraph: 'Practical techniques to self-motivated.',
            buttonText: 'Watch Now'
          }

        ],
        hindi: [
          {
            id: 1,
            image: 'https://i.ytimg.com/vi/fG1oNm2tCro/hqdefault.jpg?sqp=-oaymwEnCOADEI4CSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLC4jgbB4Kix2BJXPulx-PmY5eiNuw',
            image1:'https://www.youtube.com/embed/fG1oNm2tCro?si=FjN8gS2CQkXnsODa',
            heading: 'चुनौतियों पर काबू पाना',
            paragraph: 'जीवन की सबसे बड़ी बाधाओं को पार करने में मदद करने के लिए प्रेरणादायक कहानियां और रणनीतियां।',
            buttonText: 'अभी देखें'
          },
          {
            id: 2,
            image: 'https://i.ytimg.com/vi/wiGIFX1xO24/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBwDFbax_tZaj5tK-GvxgGQE1pDbQ',
            image1:'https://www.youtube.com/embed/wiGIFX1xO24?si=vHiRMRAyIxNjOHTA',
            heading: 'आत्मविश्वास निर्माण',
            paragraph: 'अटूट आत्मविश्वास और आत्म-विश्वास बनाने की व्यावहारिक तकनीकें।',
            buttonText: 'अभी देखें'
          },
          {
            id: 3,
            image: 'https://i.ytimg.com/vi/9WarIg8p8js/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBtKBRxrTqI5VL2hhSOYgi5-c9qlA',
            image1:'https://www.youtube.com/embed/9WarIg8p8js?si=J_ITrlXwjBYw7F0f',
            heading: 'बड़ा सोचो ',
            paragraph: 'अटूट आत्मविश्वास और आत्म-विश्वास बनाने की व्यावहारिक तकनीकें।',
            buttonText: 'अभी देखें'
          }
        ]
      },
      audio: {
        english: [
          {
            id: 1,
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop',
            image1:'',
            heading: 'Daily Affirmations',
            paragraph: 'Powerful positive affirmations to start your day with confidence and purpose.',
            buttonText: 'Listen Now'
          }
        ],
        hindi: [
          {
            id: 1,
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop',
            image1:'',
            heading: 'दैनिक प्रतिज्ञान',
            paragraph: 'आत्मविश्वास और उद्देश्य के साथ अपना दिन शुरू करने के लिए शक्तिशाली सकारात्मक प्रतिज्ञान।',
            buttonText: 'अभी सुनें'
          }
        ]
      },
      blog: {
        english: [
          {
            id: 1,
            image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop',
            image1:'',
            heading: 'Success Mindset Secrets',
            paragraph: 'Unlock the mental strategies used by highly successful people to achieve their goals.',
            buttonText: 'Read More'
          }
        ],
        hindi: [
          {
            id: 1,
            image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop',
            image1:'',
            heading: 'सफलता की मानसिकता के रहस्य',
            paragraph: 'अपने लक्ष्यों को प्राप्त करने के लिए अत्यधिक सफल लोगों द्वारा उपयोग की जाने वाली मानसिक रणनीतियों को अनलॉक करें।',
            buttonText: 'और पढ़ें'
          }
        ]
      }
    }
  };

  // Get current content based on filters
  const getCurrentContent = () => {
    return content[selectedCategory]?.[selectedType]?.[language] || [];
  };

  const currentContent = getCurrentContent();

  // Navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % currentContent.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + currentContent.length) % currentContent.length);
  };

  // Reset slide when filters change
  useEffect(() => {
    setCurrentSlide(0);
  }, [selectedCategory, selectedType]);

  // Get cards to display based on screen size
  const getCardsToShow = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 768) return 2; // Medium and Large screen
      return 1; // Small screens only
    }
    return 1;
  };

  const [cardsToShow, setCardsToShow] = useState(1);

  useEffect(() => {
    const updateCardsToShow = () => setCardsToShow(getCardsToShow());
    updateCardsToShow();
    window.addEventListener('resize', updateCardsToShow);
    return () => window.removeEventListener('resize', updateCardsToShow);
  }, []);

  // Click handlers
  const handleImageClick = (item) => {
    console.log('Image clicked:', item);
    // Add your image click logic here
  };

  const handleButtonClick = (item) => {
    console.log('Button clicked:', item);
    // Add your button click logic here
  };

  const getVisibleCards = () => {
    const cards = [];
    for (let i = 0; i < cardsToShow && i < currentContent.length; i++) {
      const cardIndex = (currentSlide + i) % currentContent.length;
      cards.push(currentContent[cardIndex]);
    }
    return cards;
  };

  // Category and type labels
  const labels = {
    english: {
      categories: {
        'mental-health': 'Mental Health',
        'fitness': 'Fitness Health',
        'motivation': 'Motivation'
      },
      types: {
        'video': 'Video',
        'audio': 'Audio',
        'blog': 'Blog'
      }
    },
    hindi: {
      categories: {
        'mental-health': 'मानसिक स्वास्थ्य',
        'fitness': 'फिटनेस स्वास्थ्य',
        'motivation': 'प्रेरणा'
      },
      types: {
        'video': 'वीडियो',
        'audio': 'ऑडियो',
        'blog': 'ब्लॉग'
      }
    }
  };

  const getIcon = (type) => {
    switch(type) {
      case 'video': return <Play className="w-3 h-3 sm:w-4 sm:h-4" />;
      case 'audio': return <Headphones className="w-3 h-3 sm:w-4 sm:h-4" />;
      case 'blog': return <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-indigo-100">
      {/* Enhanced Background Pattern */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full" style={{
            backgroundImage: `linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
         
        {/* Blue Patches - Static */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full opacity-40 -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-sky-100 to-sky-200 rounded-full opacity-30 -translate-x-1/2"></div>
        <div className="absolute bottom-0 right-3/4 w-72 h-72 bg-gradient-to-tr from-indigo-100 to-indigo-200 rounded-full opacity-35 translate-y-1/3"></div>
        <div className="absolute bottom-1/3 left-3/4 w-64 h-64 bg-gradient-to-bl from-cyan-100 to-cyan-200 rounded-full opacity-30"></div>
        <div className="absolute top-5/7 right-1/4 w-56 h-56 bg-gradient-to-tl from-blue-100 to-blue-200 rounded-full opacity-25"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 p-3 sm:p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Category Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-6 md:mb-8">
            {Object.keys(labels[language].categories).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 sm:px-4 md:px-6 py-2 md:py-3 rounded-xl font-medium text-xs sm:text-sm md:text-base transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category
                    ? 'bg-white/80 text-slate-800 shadow-xl backdrop-blur-lg border border-blue-200/60'
                    : 'bg-white/50 text-slate-700 hover:bg-white/70 backdrop-blur-lg border border-blue-100/40'
                } shadow-lg`}
              >
                {labels[language].categories[category]}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-8">
            {/* Left Sidebar - Type Filter */}
            <div className="w-full lg:w-1/3 xl:w-1/4">
              <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-4 md:p-6 border border-blue-100/60 shadow-xl h-fit">
                <h3 className="text-slate-800 text-sm sm:text-base md:text-base lg:text-xl font-bold mb-3 md:mb-4">Content Type</h3>
                <div className="space-y-2 md:space-y-3">
                  {Object.keys(labels[language].types).map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`w-full flex items-center gap-2 sm:gap-3 px-3 md:px-4 py-2 md:py-3 rounded-xl font-medium text-xs sm:text-sm md:text-base transition-all duration-300 transform hover:scale-105 ${
                        selectedType === type
                          ? 'bg-blue-100/80 text-slate-800 shadow-lg border border-blue-200/60'
                          : 'bg-white/50 text-slate-600 hover:bg-white/70 border border-blue-50/40'
                      }`}
                    >
                      {getIcon(type)}
                      <span>{labels[language].types[type]}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Content Area - Cards with Slider */}
            <div className="w-full lg:w-2/3 xl:w-3/4">
              {currentContent.length > 0 ? (
                <div className="relative">
                  {/* Slider Container */}
                  <div className="relative overflow-hidden rounded-2xl">
                    <div className="flex justify-center items-center min-h-[350px] sm:min-h-[400px] md:min-h-[450px]">
                      <div className={`grid ${cardsToShow === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-3 sm:gap-4 md:gap-6 w-full`}>
                        {getVisibleCards().map((item, index) => (
                          <div
                            key={`${item.id}-${index}`}
                            className="bg-white/80 backdrop-blur-lg rounded-2xl overflow-hidden shadow-xl border border-blue-100/60 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:bg-white/90"
                          >
                            <div 
                              className="relative h-32 sm:h-40 md:h-48 lg:h-52 xl:h-56 overflow-hidden cursor-pointer group"
                              onClick={() => handleImageClick(item)}
                            >
                               
                              <img
                                src={item.image}
                                alt={item.heading}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                              />


                              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                              <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <div className="text-white p-3 rounded-full bg-white/20 backdrop-blur-sm">
                                  {getIcon(selectedType)}
                                </div>
                              </div>
                            </div>
                            <div className="p-3 sm:p-4 md:p-6">
                              <h3 className="text-slate-800 text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-2 md:mb-3 line-clamp-2">
                                {item.heading}
                              </h3>
                              <p className="text-slate-600 text-xs sm:text-sm md:text-base mb-3 md:mb-4 line-clamp-3">
                                {item.paragraph}
                              </p>
                              <button 
                                // onClick={() => handleButtonClick(item)}
                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold py-2 md:py-3 px-4 rounded-xl hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 transform hover:scale-105 shadow-lg text-xs sm:text-sm md:text-base"
                              >
                                <a href={item.image1}>{item.buttonText}</a>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Navigation Buttons */}
                  {currentContent.length > cardsToShow && (
                    <div className="flex justify-center gap-2 sm:gap-3 md:gap-4 mt-4 md:mt-6">
                      <button
                        onClick={prevSlide}
                        className="p-2 md:p-3 bg-white/80 backdrop-blur-lg rounded-full text-slate-700 hover:bg-white/90 hover:text-slate-800 transition-all duration-300 transform hover:scale-110 border border-blue-100/50 shadow-lg"
                      >
                        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                      </button>
                      <button
                        onClick={nextSlide}
                        className="p-2 md:p-3 bg-white/80 backdrop-blur-lg rounded-full text-slate-700 hover:bg-white/90 hover:text-slate-800 transition-all duration-300 transform hover:scale-110 border border-blue-100/50 shadow-lg"
                      >
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                      </button>
                    </div>
                  )}

                  {/* Slider Indicators */}
                  {currentContent.length > 1 && (
                    <div className="flex justify-center gap-1 md:gap-2 mt-3 md:mt-4">
                      {currentContent.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentSlide(index)}
                          className={`w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                            index === currentSlide
                              ? 'bg-blue-600 scale-125'
                              : 'bg-blue-300 hover:bg-blue-500'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 sm:p-8 md:p-12 border border-blue-100/60 text-center shadow-xl">
                  <p className="text-slate-600 text-sm sm:text-base md:text-lg">No content available for this selection.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcePage;