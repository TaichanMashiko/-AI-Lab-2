import React, { useState, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { StudentData, GoogleJwtPayload } from './types';
import { fetchStudentData } from './services/sheetService';
import { InfoCard } from './components/InfoCard';
import { APP_TITLE, GOOGLE_CLIENT_ID } from './constants';
import { ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);

  // Note on Vercel vs Google Apps Script:
  // Unlike GAS which runs within Google's authorized environment, a standalone Vercel app
  // cannot silently access the browser's signed-in user email due to security sandbox policies.
  // We MUST use the Google Identity Services (OAuth) to bridge this gap.
  // We use the "implicit" flow via a button to respect the user's explicit intent.

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      setError(null);
      try {
        // Fetch user info using the access token
        const userInfo = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
        );

        const email = userInfo.data.email;
        setCurrentUserEmail(email);
        
        // Fetch matching data from the spreadsheet
        const data = await fetchStudentData(email);
        
        if (data) {
          setStudentData(data);
        } else {
          setError(`メールアドレス (${email}) に一致するデータが見つかりませんでした。`);
        }
      } catch (err) {
        console.error(err);
        setError('情報の取得に失敗しました。');
      } finally {
        setLoading(false);
      }
    },
    onError: () => {
      setError('Googleログインに失敗しました。');
    }
  });

  return (
    <div className="min-h-screen bg-[#f4f7f6] flex flex-col items-center justify-center p-4">
      
      <header className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-[#2c3e50] flex items-center justify-center gap-2">
          <ShieldCheck className="text-green-600" />
          {APP_TITLE}
        </h1>
      </header>

      {/* ERROR MESSAGE */}
      {error && (
        <div className="mb-6 w-full max-w-md bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-start gap-3">
            <AlertCircle className="shrink-0 mt-0.5" size={20} />
            <p className="text-sm">{error}</p>
        </div>
      )}

      {/* LOADING STATE */}
      {loading && (
        <div className="flex flex-col items-center text-gray-500 animate-pulse">
          <Loader2 className="animate-spin mb-2" size={32} />
          <p>情報を照会しています...</p>
        </div>
      )}

      {/* SUCCESS STATE */}
      {!loading && studentData && (
        <InfoCard data={studentData} />
      )}

      {/* INITIAL STATE (LOGIN) */}
      {!loading && !studentData && (
        <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-sm w-full">
            <p className="text-gray-600 mb-6">
                Google Chromeにログインしているアカウントを使用して、<br/>
                IDとパスワードを確認します。
            </p>
            
            {GOOGLE_CLIENT_ID.includes("YOUR_GOOGLE_CLIENT_ID") ? (
                 <div className="p-4 bg-yellow-50 text-yellow-800 text-xs text-left rounded border border-yellow-200">
                    <strong>設定エラー:</strong><br/>
                    <code>constants.ts</code> 内の <code>GOOGLE_CLIENT_ID</code> を設定してください。<br/>
                    Vercel環境ではOAuth設定が必須です。
                 </div>
            ) : (
                <button 
                    onClick={() => login()}
                    className="flex items-center justify-center w-full gap-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-sm"
                >
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google Logo" />
                    Googleアカウントを確認
                </button>
            )}
            
            <p className="mt-4 text-xs text-gray-400">
                ※公式ログインページではありません。Vercel上でアカウントを識別するためにGoogle認証を使用します。
            </p>
        </div>
      )}
      
    </div>
  );
}

export default App;