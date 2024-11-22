# 🚀 **Prepify: Revolutionizing Engineering Education**

Prepify is a cutting-edge solution designed to make **engineering education** accessible and engaging. By leveraging the power of **AI and 3D technologies**, Prepify simplifies complex concepts, enhances assessments, and personalizes learning for students of all backgrounds. With **SambaNova Cloud** at its core, Prepify transforms how students interact with technical knowledge.

---

## 🎯 **Features at a Glance**

### 🏫 **Prepia: A 3D Model for Interactive Classroom Learning**
**Purpose:** A dynamic 3D model to enhance interactive learning experiences.  
**Key Features:**
- **Text-to-Speech Conversion**: Converts input text to speech using **Microsoft Cognitive Services Speech SDK**.
- **Customizable Voices**: Supports various voices (default: `en-US-AvaMultilingualNeural`).
- **Speech Visualization**: Captures viseme data for enhanced visualization.
- **Audio Output**: Generates responses as MP3 audio files (`audio/mpeg`).
- **Simple Configuration**: Fully configurable via environment variables.

**Powered By:**
- **SambaNova Cloud API**: Advanced AI processing with `Meta-Llama-3.1-8B-Instruct`.
- **Settings**: 
  - **Max Tokens**: 500  
  - **Temperature**: 0.7 (striking a balance between creativity and accuracy).

---

### 🔍 **Article Generation**
**Purpose:** Generate concise, student-friendly articles on engineering topics.  
**Supported Disciplines:**
- Mechanical Engineering
- Electrical Engineering
- Civil Engineering
- Computer Science
- Other engineering fields  

**How It Works:**
- Users input a technical question.
- Prepify uses **SambaNova AI** to create a clear, engaging article.
- Articles are optimized for readability and understanding.

---

### ❓ **Question Generation**
**Purpose:** Test your knowledge by generating questions tailored to specific topics.  
**Use Cases:**
- Create exam-style questions for practice.
- Self-assess understanding with short and descriptive questions.

**Features:**
- Supports various complexity levels for customized practice.
- Powered by **SambaNova Cloud API**.

---

### 📈 **Performance Evaluation**
**Purpose:** Track and enhance your learning progress.  
**Key Features:**
- Upload answers to generated questions for evaluation.
- Receive detailed performance reports.
- Identify areas for improvement with actionable feedback.

---

### 🗣️ **Text-to-Speech Integration**
**Purpose:** Make learning accessible and dynamic by converting articles into **natural-sounding speech**.  
**Use Cases:**
- Helps **visually impaired students** access content effortlessly.
- Supports students who prefer auditory learning.

**Technology:** Powered by **Microsoft Azure Speech SDK**, ensuring high-quality audio playback.

---

## 💻 **Tech Stack**

### 🌐 **Frontend**
- **Next.js**: React framework for server-side rendering and static site generation.
- **Tailwind CSS**: A utility-first CSS framework for responsive and modern designs.
- **TypeScript**: Ensures type safety for reliable application development.
- **Axios**: For seamless HTTP requests to the backend.

### 🛠️ **Backend**
- **Flask**: Lightweight Python framework for building APIs.
- **Flasgger (Swagger UI)**: Automatically generates interactive API documentation.
- **Flask-CORS**: Handles cross-origin requests for seamless frontend-backend communication.
- **SambaNova AI Models**:
  - **`Meta-Llama-3.1-8B-Instruct`**: Advanced text generation model.
  - **`Llama-3.2-11B-Vision-Instruct`**: Handles image-to-text tasks and OCR.
- **Deployment Platform**: Hosted on **Render** for reliable scalability.

---

## 🔧 **Installation & Setup**

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd <repository-directory>
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
Create a `.env` file with the following:
```env
SAMBANOVA_API_KEY=your-api-key-here
```

### Step 4: Run the Development Server
```bash
npm run dev
```

### Step 5: Access the Application
- Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📋 **How to Use**

1. **Ask a Question**  
   - Enter a technical question related to engineering disciplines.
2. **Generate Articles**  
   - Receive detailed, student-friendly articles tailored to your query.
3. **Listen to Content**  
   - Use the built-in **text-to-speech player** to listen to the generated article.
4. **Test Your Knowledge**  
   - Generate questions to assess your understanding.
5. **Evaluate Performance**  
   - Upload answers and receive detailed progress reports.

---

## 🏗️ **Project Structure**

```
├── public
│   ├── assets          # Static files (images, audio, etc.)
├── src
│   ├── components      # UI components
│   ├── pages           # Application pages (including API routes)
│   ├── utils           # Utility functions and configurations
├── .env                # Environment variables
└── README.md           # Project documentation
```

---

## 🖼️ **Screenshots and Visuals**

### Home Page  
[![image](https://github.com/user-attachments/assets/a3f0d6d1-32f8-409f-a01c-8a4316115c71)]


### Prepia 3D Model  
[![WhatsApp Image 2024-11-23 at 02 00 45_da19aca6](https://github.com/user-attachments/assets/8b8e6dfd-eaf8-4849-9315-9de53247b7bb)]


### Generated Article  
[![image](https://github.com/user-attachments/assets/a97959b8-256f-4118-a96e-43b53af0593e)]


### Performance Dashboard  
[![image](https://github.com/user-attachments/assets/f6a671c4-7317-44a5-b12f-a3034d2ef738)]


---

## 💡 **Future Enhancements**

- 🌍 **Multilingual Support**: Generate articles in multiple languages.  
- 🎵 **Enhanced Audio Playback**: Add controls for playing, pausing, and skipping text-to-speech content.  
- 🔒 **User Authentication**: Save user progress and generated content for future reference.  
- 📴 **Offline Mode**: Enable offline access to saved articles and audio responses.  

---

## 🤝 **Contributing**

We welcome contributions! Follow these steps to get involved:  
1. **Fork the Repository**  
   ```bash
   git checkout -b feature-name
   ```
2. **Make Changes**  
   - Implement your feature or fix.  
3. **Submit a Pull Request**  
   - Push your changes and open a PR for review.  

---

## 🎉 **Get Started Today!**

Access the live application [here]((https://capable-mochi-88f88c.netlify.app/)).  
Explore, learn, and revolutionize your educational journey with **Prepify**!
```
