import os
from flask import Flask, request, jsonify
import json
import main

# Create the Flask application instance
app = Flask(__name__)

@app.route('/elara/api', methods=['POST'])
def handle_request():
    """
    Receives a POST request with user data, processes it using main.py,
    and returns the AI response and critical flag.
    """
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "Invalid JSON data"}), 400

        user_query = data.get('user_query')
        conversation_history = data.get('conversation_history', [])
        session_offered_booking = data.get('session_offered_booking', False)

        if not user_query:
            return jsonify({"error": "user_query is missing"}), 400

        ai_response, state_identified, _ = main.generate_response(
            user_query, 
            main.db, 
            main.model, 
            conversation_history, 
            session_offered_booking
        )

        # Prepare the JSON response
        response_data = {
            "ai_response": ai_response,
            "state_identified": state_identified
        }
        
        return jsonify(response_data), 200

    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)