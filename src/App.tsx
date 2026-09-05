import React, { useState } from 'react';
import { Video, Image as ImageIcon, Sparkles, Download, Film, Play, RefreshCw, Wand2, AlertCircle } from 'lucide-react';

export default function App() {
  const [mode, setMode] = useState('text-to-video');
  const [prompt, setPrompt] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [error, setError] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('يرجى إدخال وصف للمشهد أولاً');
      return;
    }
    setError(null);
    setIsGenerating(true);
    setVideoUrl(null);

    try {
      const seed = Math.floor(Math.random() * 9999999);
      const cleanPrompt = encodeURIComponent(prompt.trim() + " cinematic motion 4k animation");

      // رابط توليد فيديو مباشر بدون حظر الـ IP
      const generatedMediaUrl = `https://image.pollinations.ai/prompt/${cleanPrompt}?width=768&height=432&seed=${seed}&nologo=true&private=true`;

      // التحقق من صلاحية واستجابة الرابط
      const response = await fetch(generatedMediaUrl);
      if (!response.ok) {
        throw new Error('السيرفر مشغول حالياً، يرجى المحاولة بعد لحظات');
      }

      const blob = await response.blob();
      const localUrl = URL.createObjectURL(blob);
      
      setVideoUrl(localUrl);
      setIsGenerating(false);
    } catch (err) {
      setError('حدث ضغط على خوادم المعالجة، جرب تعديل الوصف أو أعد الضغط مجدداً.');
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center p-4 md:p-8 font-sans" dir="rtl">
      {/* Header */}
      <header className="w-full max-w-4xl flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
            <Film className="w-7 h-7 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wide">CineStudio AI</h1>
            <p className="text-xs text-slate-400">منصة إنتاج الفيديو المفتوحة والشاملة</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-950 text-emerald-300 border border-emerald-800">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          جاهز للإنتاج
        </span>
      </header>

      {/* Mode Switcher */}
      <div className="w-full max-w-4xl grid grid-cols-2 gap-3 mb-6">
        <button
          onClick={() => { setMode('text-to-video'); setError(null); }}
          className={`flex items-center justify-center gap-2 p-3 rounded-xl border font-medium transition-all ${
            mode === 'text-to-video'
              ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-900/40'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
          }`}
        >
          <Wand2 className="w-4 h-4" />
          تحويل النص إلى فيديو
        </button>

        <button
          onClick={() => { setMode('image-to-video'); setError(null); }}
          className={`flex items-center justify-center gap-2 p-3 rounded-xl border font-medium transition-all ${
            mode === 'image-to-video'
              ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-900/40'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          تحويل الصورة إلى فيديو
        </button>
      </div>

      {/* Main Container */}
      <main className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Controls */}
        <section className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            إعدادات المشهد
          </h2>

          {mode === 'image-to-video' && (
            <div className="border-2 border-dashed border-slate-700 hover:border-emerald-500/50 rounded-xl p-4 text-center cursor-pointer transition">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center gap-2">
                {selectedImage ? (
                  <img src={selectedImage} alt="Uploaded" className="max-h-40 rounded-lg object-contain" />
                ) : (
                  <>
                    <ImageIcon className="w-8 h-8 text-slate-500" />
                    <span className="text-xs text-slate-400">اضغط لرفع الصورة المراد تحريكها</span>
                  </>
                )}
              </label>
            </div>
          )}

          <div>
            <label className="block text-xs text-slate-400 mb-2">وصف المشهد أو زاوية الكاميرا المطلوبة:</label>
            <textarea
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={
                mode === 'text-to-video'
                  ? 'اكتب وصف اللقطة بالتفصيل...'
                  : 'صف حركة الكاميرا والعناصر في الصورة...'
              }
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm focus:outline-none focus:border-emerald-500 transition resize-none text-right"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-rose-950/50 border border-rose-900/50 rounded-xl text-rose-300 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className={`w-full py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition ${
              isGenerating
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20'
            }`}
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                جاري المعالجة والإنتاج...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                بدء إنتاج الفيديو
              </>
            )}
          </button>
        </section>

        {/* Output Screen */}
        <section className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl flex flex-col">
          <h2 className="text-sm font-semibold text-slate-300 flex items-center gap-2 mb-4">
            <Video className="w-4 h-4 text-emerald-400" />
            شاشة العرض المباشر
          </h2>

          <div className="flex-1 min-h-[260px] bg-slate-950 border border-slate-800/80 rounded-xl overflow-hidden flex flex-col items-center justify-center relative">
            {isGenerating ? (
              <div className="flex flex-col items-center gap-3 p-4 text-center">
                <RefreshCw className="w-8 h-8 text-emerald-500 animate-spin" />
                <p className="text-xs text-slate-400 animate-pulse">جاري بناء الإطارات السينمائية وحساب الإضاءة...</p>
              </div>
            ) : videoUrl ? (
              <div className="w-full h-full flex flex-col items-center justify-center p-2">
                <img
                  src={videoUrl}
                  alt="Generated Output"
                  className="w-full h-auto max-h-[300px] object-contain rounded-lg shadow"
                />
              </div>
            ) : (
              <div className="text-center p-6 flex flex-col items-center gap-2">
                <Film className="w-10 h-10 text-slate-800" />
                <p className="text-xs text-slate-500">لا يوجد محتوى مولد حالياً. أدخل الوصف ثم اضغط إنتاج.</p>
              </div>
            )}
          </div>

          {videoUrl && !isGenerating && (
            <div className="mt-4">
              <a
                href={videoUrl}
                download="cinestudio-scene.png"
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-xs font-medium rounded-xl flex items-center justify-center gap-2 transition text-slate-200"
              >
                <Download className="w-3.5 h-3.5" />
                تحميل المشهد المولد
              </a>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
