'use client';

export function LoaderScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-30px);
          }
        }
        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-25px);
          }
        }
        @keyframes float-delayed-2 {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-35px);
          }
        }
        @keyframes gentle-sway {
          0%, 100% {
            opacity: 0.8;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 4s ease-in-out infinite 0.5s;
        }
        .animate-float-delayed-2 {
          animation: float-delayed-2 4s ease-in-out infinite 1s;
        }
        .animate-gentle-sway {
          animation: gentle-sway 3s ease-in-out infinite;
        }
      `}</style>

      <div className="flex flex-col items-center gap-12">
        {/* Floating Elements */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          {/* Floating Circle 1 */}
          <div className="absolute animate-float">
            <div className="w-12 h-12 bg-blue-600 rounded-full opacity-70"></div>
          </div>

          {/* Floating Circle 2 */}
          <div className="absolute animate-float-delayed">
            <div className="w-10 h-10 bg-blue-400 rounded-full opacity-60"></div>
          </div>

          {/* Floating Circle 3 */}
          <div className="absolute animate-float-delayed-2">
            <div className="w-8 h-8 bg-blue-300 rounded-full opacity-50"></div>
          </div>

          {/* Center Icon with gentle sway */}
          <div className="animate-gentle-sway">
            <svg className="w-16 h-16 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>

        {/* Loading Text */}
        <div className="flex flex-col items-center gap-4">
          <h3 className="text-xl font-semibold text-gray-900">Loading</h3>
          <div className="flex gap-2">
            <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
          </div>
        </div>
      </div>
    </div>
  );
}
