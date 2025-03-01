# Food-Frame 🍽️

Food-Frame is an AI-powered calorie tracker built with [Expo Router](https://expo.github.io/router/). 

## 📸 Screenshot

![App Screenshot](./assets/screenshot-20250228.png)

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the App

For iOS:
```bash
npm run ios
```
For Android:
```bash
npm run android
```
For Web:
```bash
npm run web
```

## 🔧 Environment Variables

Create a `.env` file in the root of your project and add the following variables:

```env
EXPO_PUBLIC_SUPABASE_URL=https://ntlrvyityzcfctnivepr.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
EXPO_PUBLIC_OPENAI_API_KEY=your_openai_api_key
```

Replace `your_supabase_anon_key` and `your_openai_api_key` with your actual keys.

## 📚 Tech Stack

- **Expo Router** - Navigation for React Native apps
- **Supabase** - Backend as a service
- **OpenAI** - AI-powered food recognition

## 📌 Features

- AI-based food recognition
- Calorie tracking
- User authentication (Supabase Auth)
- Real-time data sync

## 🛠️ Development

- Clone the repo:
  ```bash
  git clone https://github.com/your-repo/food-frame.git
  cd food-frame
  ```
- Install dependencies:
  ```bash
  npm install
  ```
- Run the app:
  ```bash
  npm run ios # or npm run android
  ```

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

## 📜 License

[MIT License](./LICENSE.md)
