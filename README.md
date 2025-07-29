
#  Findle – AI-Powered Lost Person Finder

**Findle** is a web-based platform that enables users to report and search for lost individuals using face recognition technology and real-time video scanning. Whether it's a missing loved one or someone lost in a public space, Findle helps bring people back together.

---

##  Features

- 📝 **Report Missing Persons**  
  Anyone can report a lost individual by submitting:
  - Image  
  - Name  
  - Age  
  - Gender  
  - Mobile number  
  - Email address  

- **Image-Based Search**  
  Upload a photo, and Findle searches the database using face embeddings to find similar faces among reported cases.

- **Live Camera Scanning (Browser)**  
  Users can grant access to their device’s camera. The system will continuously scan the video feed to identify matches with the lost persons' database in real time.

- **CCTV Integration (Coming Soon)**  
  CCTV streams will be supported in the future for continuous public surveillance and detection.

---

## How It Works

- **Face Matching**:  
  Utilizes [DeepFace](https://github.com/serengil/deepface) to extract and compare face embeddings for fast and accurate recognition.

- **Fast Comparison**:  
  Embedding-based matching drastically speeds up the face search process.

- **Real-Time Video Scanning**:  
  Video feeds are handled using **Socket.IO**, enabling continuous scanning and quick responses.

---

## Tech Stack

| Component      | Technology         |
|----------------|--------------------|
| Frontend       | React.js           |
| Backend        | Flask (Python)     |
| Face Matching  | DeepFace           |
| Real-Time Comm | Socket.IO          |
| Video Input    | Browser Camera / CCTV (WIP) |
| Database       | Mongo DB |

---

## 📂 Project Structure

Findle/
├── backend/
│ ├── main.py
│ ├── routes/
│ └── ...
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
| | |-- styles/
│ │ └── App.js
├── README.md


---

## 🚀 Getting Started

### Backend (Flask)

```bash
cd backend
pip install -r requirements.txt
python main.py
````

---
### Frontend (React)

```bash
cd frontend
npm install
npm run dev
````
=======
# Findle
Findle is a smart people-finding tool that helps identify and locate individuals using available data like name, phone number, email, or social links. It uses intelligent matching to provide accurate results for search or verification purposes.
>>>>>>> 1076381 (Initial commit)
