import { useState } from 'react';

interface Character {
  id: number;
  name: string;
  role: string;
  image: string | null;
}

export default function App() {
  const [tab, setTab] = useState<'characters' | 'script' | 'preview'>('characters');
  const [title, setTitle] = useState('الصعلوك');
  const [genre, setGenre] = useState('كوميديا - العصر الحالي');

  // قائمة الشخصيات المتعددة مع دعم الصور
  const [characters, setCharacters] = useState<Character[]>([
    {
      id: 1,
      name: 'الصعلوك',
      role: 'بطل القصة، طيب وفقير ينقذ طفلة عمياء.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 2,
      name: 'الطفلة',
      role: 'طفلة عمياء تحتاج إلى مساعدة طبية.',
      image: null
    }
  ]);

  const [charName, setCharName] = useState('');
  const [charRole, setCharRole] = useState('');
  const [charImage, setCharImage] = useState<string | null>(null);

  // السيناريو ومشغل الفيلم
  const [script, setScript] = useState(
    'المشهد 1:\nفي مدينة مكتظة، صعلوك طيب ينقذ طفلة من لص، ثم يجر طبيب عيون إلى خطة عبثية لإنقاذ بصرها.'
  );
  const [isPlaying, setIsPlaying] = useState(false);

  // معالجة رفع الصورة من الجهاز
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCharImage(imageUrl);
    }
  };

  const addCharacter = () => {
    if (!charName.trim()) return;
    setCharacters([
      ...characters,
      { id: Date.now(), name: charName, role: charRole, image: charImage }
    ]);
    setCharName('');
    setCharRole('');
    setCharImage(null);
  };

  const deleteCharacter = (id: number) => {
    setCharacters(characters.filter((c) => c.id !== id));
  };

  return (
    <div style={{
      background: '#0d1117',
      color: '#e6edf3',
      minHeight: '100vh',
      padding: '16px',
      direction: 'rtl',
      fontFamily: 'sans-serif'
    }}>
      {/* الرأس */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0, color: '#e5a93b' }}>🎬 CineCraft</h2>
        <span style={{ fontSize: '12px', background: '#21262d', padding: '4px 8px', borderRadius: '12px' }}>
          {genre}
        </span>
      </header>

      {/* عنوان العمل */}
      <h1 style={{ fontSize: '24px', margin: '0 0 16px 0', color: '#f0f6fc' }}>{title}</h1>

      {/* شريط التبويبات */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        <button
          onClick={() => setTab('characters')}
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '8px',
            border: 'none',
            background: tab === 'characters' ? '#238636' : '#21262d',
            color: '#fff',
            cursor: 'pointer'
          }}
        >
          الشخصيات ({characters.length})
        </button>
        <button
          onClick={() => setTab('script')}
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '8px',
            border: 'none',
            background: tab === 'script' ? '#238636' : '#21262d',
            color: '#fff',
            cursor: 'pointer'
          }}
        >
          السيناريو
        </button>
        <button
          onClick={() => setTab('preview')}
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '8px',
            border: 'none',
            background: tab === 'preview' ? '#1f6feb' : '#21262d',
            color: '#fff',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          عرض الفيلم 🎥
        </button>
      </div>

      {/* محتوى الشخصيات */}
      {tab === 'characters' && (
        <div>
          <div style={{ background: '#161b22', padding: '14px', borderRadius: '8px', marginBottom: '16px', border: '1px solid #30363d' }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>إضافة شخصية جديدة</h3>
            
            <input
              type="text"
              placeholder="اسم الشخصية"
              value={charName}
              onChange={(e) => setCharName(e.target.value)}
              style={{ width: '100%', padding: '8px', marginBottom: '8px', background: '#0d1117', border: '1px solid #30363d', color: '#fff', borderRadius: '6px', boxSizing: 'border-box' }}
            />
            
            <input
              type="text"
              placeholder="دور الشخصية أو وصفها"
              value={charRole}
              onChange={(e) => setCharRole(e.target.value)}
              style={{ width: '100%', padding: '8px', marginBottom: '8px', background: '#0d1117', border: '1px solid #30363d', color: '#fff', borderRadius: '6px', boxSizing: 'border-box' }}
            />

            {/* رفع صورة الشخصية */}
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px', color: '#8b949e' }}>صورة الشخصية (اختياري):</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ width: '100%', fontSize: '12px', color: '#8b949e' }}
              />
              {charImage && (
                <div style={{ marginTop: '8px' }}>
                  <img src={charImage} alt="معاينة" style={{ width: '60px', height: '60px', borderRadius: '6px', objectFit: 'cover' }} />
                </div>
              )}
            </div>

            <button
              onClick={addCharacter}
              style={{ width: '100%', padding: '10px', background: '#238636', border: 'none', color: '#fff', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              + إضافة الشخصية
            </button>
          </div>

          {/* قائمة الشخصيات المضافة */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {characters.map((c) => (
              <div key={c.id} style={{
                background: '#161b22',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #30363d',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                {c.image ? (
                  <img src={c.image} alt={c.name} style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #58a6ff' }} />
                ) : (
                  <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#21262d', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b949e', fontSize: '20px' }}>
                    👤
                  </div>
                )}
                
                <div style={{ flex: 1 }}>
                  <strong style={{ color: '#58a6ff', fontSize: '16px' }}>{c.name}</strong>
                  <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#8b949e' }}>{c.role}</p>
                </div>

                <button
                  onClick={() => deleteCharacter(c.id)}
                  style={{ background: 'transparent', border: 'none', color: '#da3633', cursor: 'pointer', fontSize: '14px' }}
                >
                  حذف
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* محتوى السيناريو */}
      {tab === 'script' && (
        <div>
          <label style={{ display: 'block', marginBottom: '8px' }}>نص المشاهد والسيناريو:</label>
          <textarea
            rows={8}
            value={script}
            onChange={(e) => setScript(e.target.value)}
            style={{ width: '100%', padding: '10px', background: '#161b22', border: '1px solid #30363d', color: '#fff', borderRadius: '8px', boxSizing: 'border-box' }}
          />
        </div>
      )}

      {/* محتوى المعاينة وتشغيل الفيلم */}
      {tab === 'preview' && (
        <div style={{ textAlign: 'center' }}>
          <div style={{
            background: '#000',
            minHeight: '260px',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            border: '2px dashed #30363d',
            marginBottom: '16px'
          }}>
            {isPlaying ? (
              <div>
                <p style={{ color: '#3fb950', fontWeight: 'bold', fontSize: '18px' }}>▶ الفيلم قيد العرض...</p>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', margin: '12px 0' }}>
                  {characters.map((c) => c.image && (
                    <img key={c.id} src={c.image} alt={c.name} style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid #238636' }} />
                  ))}
                </div>
                <p style={{ fontSize: '14px', color: '#c9d1d9', maxWidth: '90%', margin: 'auto', lineHeight: '1.6' }}>{script}</p>
              </div>
            ) : (
              <div>
                <p style={{ color: '#8b949e', margin: 0 }}>المشروع جاهز بكل شخصياته ومشاهده</p>
                <p style={{ color: '#58a6ff', fontSize: '13px', marginTop: '6px' }}>عدد أبطال الفيلم: {characters.length}</p>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              fontWeight: 'bold',
              borderRadius: '8px',
              border: 'none',
              background: isPlaying ? '#da3633' : '#238636',
              color: '#fff',
              cursor: 'pointer',
              width: '100%'
            }}
          >
            {isPlaying ? 'إيقاف مؤقت' : 'تشغيل الفيلم الآن 🎬'}
          </button>
        </div>
      )}
    </div>
  );
}
