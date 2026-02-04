// ==========================================
// 設定手順 (Setup Instructions)
// ==========================================

// 1. Google Cloud Console (https://console.cloud.google.com/)
//    - プロジェクトを作成し、「OAuth 同意画面」を外部(External)で設定
//    - 「認証情報」>「OAuth クライアントID」を作成 (ウェブアプリケーション)
//    - 「承認済みの JavaScript 生成元」に以下を追加:
//        - http://localhost:5173
//        - https://あなたのアプリ.vercel.app
export const GOOGLE_CLIENT_ID = "1008158953225-00tpq2fe0oifl7qmsnkai6inld3n8oon.apps.googleusercontent.com"; 

// 2. Googleスプレッドシート (Google Sheet)
//    - メニューの「ファイル」>「共有」>「ウェブに公開」
//    - 「ドキュメント全体」と「カンマ区切り形式 (.csv)」を選択して公開
export const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTacj9iZ872kPoG3_q5rbAKnZj0i9tRvrjdNHJvg50OfQLdhT9FIP0LajrEfyBhEGsgEMfdmQDZR2LA/pub?output=csv";

export const APP_TITLE = "個人情報ビューア";