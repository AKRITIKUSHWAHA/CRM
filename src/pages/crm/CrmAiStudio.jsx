import React, { useState, useRef } from 'react';
import {
  Sparkles,
  Video,
  Image as ImageIcon,
  Music,
  Mic,
  Box,
  Workflow,
  FolderGit2,
  UploadCloud,
  Play,
  Download,
  Save,
  Loader2,
  Wand2,
  CheckCircle2,
  Zap,
  Cpu,
  Clock,
  Layers,
  X,
  FileImage
} from 'lucide-react';
import {
  Breadcrumb,
  Button,
  Card,
  CardHeader,
  CardBody,
  Input,
  Select,
  Badge,
  ProgressBar,
  KPICard
} from '../../components/ui';
import { useToast } from '../../context/ToastContext';

const aiTools = [
  { id: 'bestie', label: 'Bestie AI Assistant', icon: Sparkles },
  { id: 'text-to-video', label: 'Text to Video', icon: Video },
  { id: 'image-to-video', label: 'Image to Video', icon: Video },
  { id: 'text-to-image', label: 'Text to Image', icon: ImageIcon },
  { id: 'ai-image', label: 'AI Image Studio', icon: ImageIcon },
  { id: 'ai-video', label: 'AI Video Editor', icon: Video },
  { id: 'ai-audio', label: 'AI Audio Generator', icon: Music },
  { id: 'music', label: 'AI Music Composer', icon: Music },
  { id: 'voice', label: 'Voice Synthesizer', icon: Mic },
  { id: '3d', label: '3D Asset Generator', icon: Box },
  { id: 'workflow', label: 'AI Workflow Automation', icon: Workflow },
  { id: 'library', label: 'My Asset Library', icon: FolderGit2 },
];

export const CrmAiStudio = () => {
  const { addToast } = useToast();
  const fileInputRef = useRef(null);

  const [activeTool, setActiveTool] = useState('text-to-image');
  const [prompt, setPrompt] = useState('Photorealistic corporate enterprise logistics warehouse with autonomous drones, 8k resolution, cinematic lighting');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [modelPreset, setModelPreset] = useState('UltraReal v2.6');
  const [referenceFile, setReferenceFile] = useState(null);

  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generatedAsset, setGeneratedAsset] = useState(null);
  const [savedLibrary, setSavedLibrary] = useState([
    { id: '1', title: 'Corporate Logistics Fleet Rendering', type: 'Image', date: '2 hours ago', url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80' },
    { id: '2', title: 'AI Executive Spokesperson Pitch', type: 'Video', date: '1 day ago', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80' },
  ]);

  const handleReferenceFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setReferenceFile(file);
      addToast({
        title: 'Reference Image Uploaded',
        message: `Loaded ${file.name} (${(file.size / 1024).toFixed(1)} KB) for style guiding.`,
        type: 'info',
      });
    }
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!prompt.trim()) {
      addToast({ title: 'Prompt Required', message: 'Please enter a generation prompt.', type: 'error' });
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(15);
    setGeneratedAsset(null);

    const interval = setInterval(() => {
      setGenerationProgress((p) => {
        if (p >= 90) {
          clearInterval(interval);
          return 95;
        }
        return p + 25;
      });
    }, 400);

    setTimeout(() => {
      clearInterval(interval);
      setGenerationProgress(100);
      setIsGenerating(false);

      const mockResult = {
        id: Date.now().toString(),
        title: prompt.slice(0, 36) + '...',
        type: activeTool.includes('video') ? 'Video' : activeTool.includes('audio') || activeTool === 'voice' ? 'Audio' : 'Image',
        date: 'Just now',
        url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=80',
        prompt,
      };

      setGeneratedAsset(mockResult);
      addToast({
        title: 'AI Generation Complete!',
        message: `Rendered high-fidelity ${mockResult.type} asset with ${modelPreset}.`,
        type: 'success',
      });
    }, 2200);
  };

  const handleSaveToLibrary = () => {
    if (generatedAsset) {
      setSavedLibrary([generatedAsset, ...savedLibrary]);
      addToast({ title: 'Saved to Library', message: 'Asset stored in your AI workspace library.', type: 'success' });
    }
  };

  return (
    <div className="flex flex-col gap-6" style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
      {/* Hidden File Input for Reference Upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleReferenceFileChange}
        accept="image/*"
        style={{ display: 'none' }}
      />

      {/* 1. Header */}
      <div className="page-header-row">
        <div>
          <Breadcrumb items={[{ label: 'CRM nErgy' }, { label: 'AI Content Studio' }]} />
          <h1
            style={{
              fontSize: '24px',
              fontWeight: 800,
              color: 'var(--text-primary)',
              margin: '2px 0 0 0',
              fontFamily: 'var(--font-display)',
              letterSpacing: '-0.02em',
            }}
          >
            AI Content & Media Studio
          </h1>
          <p className="text-xs text-secondary margin-0" style={{ marginTop: '2px' }}>
            Generative AI engine for enterprise branding, video production, and synthetic voice models.
          </p>
        </div>

        <div className="header-actions-right">
          <Badge variant="primary" icon={Sparkles}>
            AI Model Gateway Online
          </Badge>
        </div>
      </div>

      {/* 2. Top Summary KPI Strip */}
      <div className="grid-responsive-kpi">
        <KPICard
          title="TOTAL AI ASSETS"
          value="1,284"
          change="28.4%"
          changeType="positive"
          changePeriod="this month"
          icon={Layers}
          iconBg="rgba(29, 78, 216, 0.1)"
          iconColor="#1d4ed8"
        />
        <KPICard
          title="ACTIVE MODEL SUITE"
          value="12 Tools"
          change="Multi-Modal"
          changeType="positive"
          changePeriod="generative suite"
          icon={Cpu}
          iconBg="rgba(147, 51, 234, 0.1)"
          iconColor="#9333ea"
        />
        <KPICard
          title="AVG RENDER SPEED"
          value="2.2 Secs"
          change="High Speed"
          changeType="positive"
          changePeriod="render latency"
          icon={Clock}
          iconBg="rgba(22, 163, 74, 0.1)"
          iconColor="#16a34a"
        />
        <KPICard
          title="GPU COMPUTE SLA"
          value="99.98%"
          change="Optimal"
          changeType="positive"
          changePeriod="uptime SLA"
          icon={Zap}
          iconBg="rgba(234, 88, 12, 0.1)"
          iconColor="#ea580c"
        />
      </div>

      {/* 3. Main Studio Responsive Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6" style={{ minHeight: '620px' }}>
        {/* Left Sidebar: 12 AI Tools (1 Column) */}
        <Card
          style={{
            borderRadius: '12px',
            boxShadow: '0 1px 3px 0 rgba(0,0,0,0.02)',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
          className="lg:col-span-1 p-3"
        >
          <div className="text-xs font-bold text-tertiary uppercase tracking-wider p-2 mb-1 border-b border-subtle">
            AI Toolset Suite (12)
          </div>

          <div className="flex flex-col gap-1.5 overflow-y-auto flex-1 p-1" style={{ maxHeight: '580px' }}>
            {aiTools.map((tool) => {
              const Icon = tool.icon;
              const isActive = activeTool === tool.id;
              return (
                <button
                  key={tool.id}
                  type="button"
                  onClick={() => setActiveTool(tool.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 0.875rem',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: isActive ? 700 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    backgroundColor: isActive ? 'rgba(29, 78, 216, 0.1)' : 'transparent',
                    color: isActive ? '#1d4ed8' : 'var(--text-secondary)',
                    border: isActive ? '1px solid var(--primary-border)' : '1px solid transparent',
                    textAlign: 'left',
                    width: '100%',
                    boxSizing: 'border-box',
                  }}
                >
                  <Icon size={16} className="flex-shrink-0" style={{ color: isActive ? '#1d4ed8' : 'var(--text-tertiary)' }} />
                  <span className="truncate">{tool.label}</span>
                </button>
              );
            })}
          </div>
        </Card>

        {/* Right Canvas: Controls, Prompt Input, Generation & Preview (3 Columns) */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          {/* TOOL = LIBRARY VIEW */}
          {activeTool === 'library' ? (
            <Card style={{ borderRadius: '12px', boxShadow: '0 1px 3px 0 rgba(0,0,0,0.02)' }} className="p-6 flex flex-col gap-4">
              <CardHeader title="My AI Asset Library" subtitle="Saved renderings, audio tracks, and video clips" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedLibrary.map((item) => (
                  <Card key={item.id} className="p-3 flex flex-col gap-2 surface-secondary" style={{ borderRadius: '10px' }}>
                    <img src={item.url} alt={item.title} className="w-full rounded-md" style={{ height: '150px', objectFit: 'cover' }} />
                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="font-bold text-primary truncate" style={{ fontSize: '13px' }}>{item.title}</span>
                      <Badge variant="primary">{item.type}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs text-tertiary border-t border-subtle pt-2">
                      <span>{item.date}</span>
                      <Button variant="ghost" size="sm" icon={Download} onClick={() => addToast({ title: 'Downloading', message: 'Downloading asset file.', type: 'info' })}>
                        Download
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          ) : (
            /* CANVAS GENERATOR VIEW */
            <Card style={{ borderRadius: '12px', boxShadow: '0 1px 3px 0 rgba(0,0,0,0.02)' }} className="p-6 flex flex-col gap-6">
              {/* Controls Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-subtle pb-4">
                <div className="flex items-center gap-2.5">
                  <div
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(29, 78, 216, 0.1)',
                      color: '#1d4ed8',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Wand2 size={18} />
                  </div>
                  <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                    {aiTools.find((t) => t.id === activeTool)?.label || 'AI Generator'}
                  </h3>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  <div style={{ width: '165px' }}>
                    <Select
                      value={aspectRatio}
                      onChange={(e) => setAspectRatio(e.target.value)}
                      options={['16:9 (Widescreen)', '9:16 (Vertical/Reels)', '1:1 (Square)', '4:3 (Classic)']}
                      style={{ height: '36px', fontSize: '12px' }}
                    />
                  </div>

                  <div style={{ width: '175px' }}>
                    <Select
                      value={modelPreset}
                      onChange={(e) => setModelPreset(e.target.value)}
                      options={['UltraReal v2.6', 'CinemaDiffusion 8K', 'Bestie Enterprise LLM']}
                      style={{ height: '36px', fontSize: '12px' }}
                    />
                  </div>
                </div>
              </div>

              {/* Prompt Input Form */}
              <form onSubmit={handleGenerate} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-secondary uppercase tracking-wider">
                    Generation Prompt & Style Instructions
                  </label>
                  <textarea
                    rows={4}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe the media, style, lighting, camera angles, or text details to generate..."
                    style={{
                      width: '100%',
                      padding: '0.875rem 1rem',
                      borderRadius: '8px',
                      border: '1px solid var(--border)',
                      backgroundColor: 'var(--surface)',
                      color: 'var(--text-primary)',
                      fontSize: '13px',
                      lineHeight: 1.6,
                      fontFamily: 'inherit',
                      boxSizing: 'border-box',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* Reference Image Attachment Chip Preview */}
                {referenceFile && (
                  <div
                    className="flex items-center justify-between p-2.5 px-3 rounded-md border-subtle"
                    style={{ backgroundColor: 'rgba(29, 78, 216, 0.08)', border: '1px solid var(--primary-border)' }}
                  >
                    <div className="flex items-center gap-2 text-xs font-semibold text-primary truncate">
                      <FileImage size={16} className="text-primary" />
                      <span className="truncate">{referenceFile.name}</span>
                      <span className="text-tertiary">({(referenceFile.size / 1024).toFixed(1)} KB)</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setReferenceFile(null);
                        if (fileInputRef.current) fileInputRef.current.value = '';
                      }}
                      className="p-1 rounded-full text-tertiary hover:text-error cursor-pointer"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}

                <div className="flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap pt-1">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    icon={UploadCloud}
                    onClick={() => fileInputRef.current?.click()}
                    style={{ width: 'auto' }}
                  >
                    {referenceFile ? 'Change Reference Image' : 'Upload Reference Image'}
                  </Button>

                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    isLoading={isGenerating}
                    icon={Sparkles}
                    style={{ width: 'auto' }}
                  >
                    Generate AI Asset
                  </Button>
                </div>
              </form>

              {/* Loading Progress State */}
              {isGenerating && (
                <div className="p-6 surface-secondary rounded-lg border-subtle flex flex-col gap-3 text-center">
                  <div className="flex items-center justify-center gap-2 text-primary font-bold text-xs">
                    <Loader2 className="animate-spin" size={18} />
                    <span>Rendering AI Model ({generationProgress}%)...</span>
                  </div>
                  <ProgressBar value={generationProgress} variant="primary" showLabel={false} />
                </div>
              )}

              {/* Result Preview Canvas */}
              {generatedAsset && (
                <div className="p-4 surface-secondary rounded-lg border-subtle flex flex-col gap-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="font-bold text-xs text-primary flex items-center gap-1.5">
                      <CheckCircle2 size={16} className="text-success" /> Generated Asset Preview ({generatedAsset.type})
                    </span>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" icon={Save} onClick={handleSaveToLibrary}>
                        Save to Library
                      </Button>
                      <Button variant="primary" size="sm" icon={Download} onClick={() => addToast({ title: 'Export Downloaded', message: 'Saved asset to local disk.', type: 'success' })}>
                        Export High-Res
                      </Button>
                    </div>
                  </div>

                  <div className="relative rounded-lg overflow-hidden border-subtle flex items-center justify-center background-surface" style={{ maxHeight: '380px' }}>
                    <img src={generatedAsset.url} alt="AI Generated Preview" className="w-full object-cover" style={{ maxHeight: '380px' }} />
                    {generatedAsset.type === 'Video' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <Button variant="primary" size="lg" isIconOnly icon={Play} />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
