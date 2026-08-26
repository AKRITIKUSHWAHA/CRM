import React, { useState } from 'react';
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
  CheckCircle2
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
  ProgressBar
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

  const [activeTool, setActiveTool] = useState('text-to-image');
  const [prompt, setPrompt] = useState('Photorealistic corporate enterprise logistics warehouse with autonomous drones, 8k resolution, cinematic lighting');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [modelPreset, setModelPreset] = useState('UltraReal v2.6');

  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generatedAsset, setGeneratedAsset] = useState(null);
  const [savedLibrary, setSavedLibrary] = useState([
    { id: '1', title: 'Corporate Logistics Fleet Rendering', type: 'Image', date: '2 hours ago', url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80' },
    { id: '2', title: 'AI Executive Spokesperson Pitch', type: 'Video', date: '1 day ago', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80' },
  ]);

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
        title: prompt.slice(0, 32) + '...',
        type: activeTool.includes('video') ? 'Video' : activeTool.includes('audio') || activeTool === 'voice' ? 'Audio' : 'Image',
        date: 'Just now',
        url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=80',
        prompt,
      };

      setGeneratedAsset(mockResult);
      addToast({
        title: 'AI Generation Complete!',
        message: `Rendered high-fidelity ${mockResult.type} asset.`,
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
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Breadcrumb items={[{ label: 'CRM nErgy' }, { label: 'AI Content Studio' }]} />
          <h1 style={{ fontSize: 'var(--text-2xl)' }}>AI Content & Media Studio</h1>
          <p className="text-xs text-secondary margin-0">
            Next-gen generative AI engine for enterprise branding, video production, and voice models
          </p>
        </div>

        <Badge variant="primary" icon={Sparkles}>
          AI Model Gateway Online
        </Badge>
      </div>

      {/* Main Studio Grid Layout */}
      <div className="grid-responsive-2col" style={{ gridTemplateColumns: '260px 1fr' }}>
        {/* Left Sidebar: 12 AI Tools */}
        <Card className="p-2 flex flex-col gap-1" style={{ maxHeight: '650px', overflowY: 'auto' }}>
          <div className="text-xs font-semibold text-tertiary uppercase tracking-wider p-2">
            AI Toolset Suite (12)
          </div>
          {aiTools.map((tool) => {
            const Icon = tool.icon;
            const isActive = activeTool === tool.id;
            return (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id)}
                className="flex items-center gap-2.5 p-2.5 rounded-sm text-xs font-medium cursor-pointer transition-all"
                style={{
                  backgroundColor: isActive ? 'var(--primary-light)' : 'transparent',
                  color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                  border: 'none',
                  textAlign: 'left',
                }}
              >
                <Icon size={16} className="flex-shrink-0" />
                <span>{tool.label}</span>
              </button>
            );
          })}
        </Card>

        {/* Right Canvas: Controls, Prompt Input, Generation & Preview */}
        <div className="flex flex-col gap-6">
          {/* TOOL = LIBRARY VIEW */}
          {activeTool === 'library' ? (
            <Card className="p-6 flex flex-col gap-4">
              <CardHeader title="My AI Asset Library" subtitle="Saved renderings, audio tracks, and video clips" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedLibrary.map((item) => (
                  <Card key={item.id} className="p-3 flex flex-col gap-2 surface-secondary">
                    <img src={item.url} alt={item.title} className="w-full rounded-sm" style={{ height: '140px', objectFit: 'cover' }} />
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-primary truncate">{item.title}</span>
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
            <Card className="p-6 flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-subtle pb-3">
                <div className="flex items-center gap-2">
                  <Wand2 className="text-primary" size={20} />
                  <h3 className="text-base font-semibold capitalize">
                    {aiTools.find((t) => t.id === activeTool)?.label || 'AI Generator'}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <Select
                    value={aspectRatio}
                    onChange={(e) => setAspectRatio(e.target.value)}
                    options={['16:9 (Widescreen)', '9:16 (Vertical/Reels)', '1:1 (Square)', '4:3 (Classic)']}
                    style={{ height: '32px', fontSize: '12px' }}
                  />

                  <Select
                    value={modelPreset}
                    onChange={(e) => setModelPreset(e.target.value)}
                    options={['UltraReal v2.6', 'CinemaDiffusion 8K', 'Bestie Enterprise LLM']}
                    style={{ height: '32px', fontSize: '12px' }}
                  />
                </div>
              </div>

              {/* Prompt Input Form */}
              <form onSubmit={handleGenerate} className="flex flex-col gap-4">
                <div className="form-group">
                  <label className="form-label">Generation Prompt & Style Instructions</label>
                  <textarea
                    rows={3}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe the media, style, lighting, camera angles, or text details to generate..."
                    className="form-control"
                    style={{ height: 'auto', padding: '0.75rem' }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Button variant="outline" size="sm" icon={UploadCloud} onClick={() => addToast({ title: 'Reference File', message: 'Uploaded reference image asset.', type: 'info' })}>
                    Upload Reference Image
                  </Button>

                  <Button
                    variant="primary"
                    size="lg"
                    type="submit"
                    isLoading={isGenerating}
                    icon={Sparkles}
                  >
                    Generate AI Asset
                  </Button>
                </div>
              </form>

              {/* Loading Progress State */}
              {isGenerating && (
                <div className="p-6 surface-secondary rounded-md border-subtle flex flex-col gap-3 text-center">
                  <div className="flex items-center justify-center gap-2 text-primary font-semibold text-xs">
                    <Loader2 className="animate-spin" size={18} />
                    <span>Rendering AI Model ({generationProgress}%)...</span>
                  </div>
                  <ProgressBar value={generationProgress} variant="primary" showLabel={false} />
                </div>
              )}

              {/* Result Preview Canvas */}
              {generatedAsset && (
                <div className="p-4 surface-secondary rounded-md border-subtle flex flex-col gap-4">
                  <div className="flex items-center justify-between">
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

                  <div className="relative rounded-md overflow-hidden border-subtle flex items-center justify-center background-surface" style={{ maxHeight: '380px' }}>
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
