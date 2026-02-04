import React, { useState } from 'react';
import { StudentData } from '../types';
import { Eye, EyeOff, User, Lock, Hash, Mail } from 'lucide-react';

interface InfoCardProps {
  data: StudentData;
}

export const InfoCard: React.FC<InfoCardProps> = ({ data }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md animate-fade-in border border-gray-100">
      <div className="text-center mb-8">
        <h3 className="text-xl font-bold text-gray-800">ようこそ、{data.name} さん</h3>
        <p className="text-sm text-gray-500 mt-1">{data.email}</p>
      </div>

      <div className="space-y-4">
        {/* Student Number */}
        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <div className="p-2 bg-blue-100 rounded-md mr-4 text-blue-600">
                <Hash size={20} />
            </div>
            <div>
                <p className="text-xs text-gray-500 font-semibold uppercase">出席番号</p>
                <p className="font-mono text-gray-800 font-medium">{data.studentNumber}</p>
            </div>
        </div>

        {/* User ID */}
        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
             <div className="p-2 bg-green-100 rounded-md mr-4 text-green-600">
                <User size={20} />
            </div>
            <div>
                <p className="text-xs text-gray-500 font-semibold uppercase">ID</p>
                <p className="font-mono text-gray-800 font-medium select-all">{data.userId}</p>
            </div>
        </div>

        {/* Password */}
        <div className="flex items-center p-3 bg-gray-50 rounded-lg relative group">
             <div className="p-2 bg-purple-100 rounded-md mr-4 text-purple-600">
                <Lock size={20} />
            </div>
            <div className="flex-grow">
                <p className="text-xs text-gray-500 font-semibold uppercase">Password</p>
                <p className="font-mono text-gray-800 font-medium">
                    {showPassword ? data.password : '••••••••'}
                </p>
            </div>
            <button
                onClick={() => setShowPassword(!showPassword)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
            >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
        </div>
      </div>
      
      <div className="mt-8 text-center text-xs text-gray-400">
        ログイン情報は他人に教えないでください
      </div>
    </div>
  );
};