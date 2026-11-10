import { X, Cloud, Terminal, CheckCircle2, Copy } from 'lucide-react';

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

interface DeployModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeployModal: React.FC<DeployModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-950 border border-cyan-500/60 rounded-xl max-w-2xl w-full p-6 shadow-2xl relative text-slate-200 font-sans max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-lg bg-cyan-950/80 border border-cyan-500/60">
            <Cloud className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h3 className="font-sc2-display font-black text-lg text-white uppercase tracking-wider">
              Despliegue en Vercel & Repositorio GitHub
            </h3>
            <p className="text-xs text-slate-400 font-sc2-mono">
              Configuración de producción lista para Vercel (`vercel.json` y Vite React incluidos)
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs">
          {/* Step 1: Subrepositorio / Repositorio GitHub */}
          <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-cyan-300 font-sc2-display flex items-center gap-1.5">
                <GithubIcon className="w-4 h-4" />
                1. CONECTAR Y SUBIR A GITHUB (SUBREPO O REPO INDEPENDIENTE)
              </span>
              <button
                onClick={() => copyToClipboard('git init\ngit add .\ngit commit -m "StarCraft 2 Modern 3D Turntable & Armory"\ngit branch -M main\ngh repo create starcraft-3d-armory --public --source=. --remote=origin --push')}
                className="text-[11px] font-sc2-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 bg-slate-800 px-2 py-0.5 rounded border border-slate-700"
              >
                <Copy className="w-3 h-3" />
                Copiar Comandos
              </button>
            </div>
            <p className="text-slate-400 text-[11px]">
              Ejecuta estos comandos en la terminal dentro de esta carpeta para inicializar el repositorio y publicarlo en GitHub usando GitHub CLI (`gh`):
            </p>
            <div className="bg-black/80 p-3 rounded font-sc2-mono text-emerald-400 text-[11px] overflow-x-auto border border-slate-800">
              <code>
                git init<br />
                git add .<br />
                git commit -m "StarCraft 2 Modern 3D Turntable & Armory"<br />
                git branch -M main<br />
                gh repo create starcraft-3d-armory --public --source=. --remote=origin --push
              </code>
            </div>
          </div>

          {/* Step 2: Despliegue en Vercel */}
          <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-cyan-300 font-sc2-display flex items-center gap-1.5">
                <Cloud className="w-4 h-4" />
                2. DESPLIEGUE INMEDIATO EN VERCEL
              </span>
              <button
                onClick={() => copyToClipboard('npx vercel --prod')}
                className="text-[11px] font-sc2-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 bg-slate-800 px-2 py-0.5 rounded border border-slate-700"
              >
                <Copy className="w-3 h-3" />
                Copiar
              </button>
            </div>
            <p className="text-slate-400 text-[11px]">
              Puedes desplegar automáticamente importando tu repositorio desde el panel de <a href="https://vercel.com/new" target="_blank" rel="noreferrer" className="text-cyan-400 underline">vercel.com/new</a> o ejecutando directamente vía CLI:
            </p>
            <div className="bg-black/80 p-3 rounded font-sc2-mono text-cyan-300 text-[11px] border border-slate-800">
              <code>npx vercel --prod</code>
            </div>
          </div>

          {/* Config details */}
          <div className="p-3 rounded bg-slate-900/40 border border-slate-800/80 space-y-1.5 text-[11px] text-slate-400 font-sc2-mono">
            <div className="flex items-center gap-2 text-slate-300 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Archivos de configuración ya creados:</span>
            </div>
            <ul className="list-disc list-inside space-y-0.5 text-slate-400 pl-2">
              <li><strong className="text-slate-200">vercel.json</strong>: Ruteo SPA y optimización de cabeceras de seguridad.</li>
              <li><strong className="text-slate-200">package.json</strong>: Scripts de compilación automática <code className="text-cyan-400">npm run build</code> con Vite.</li>
              <li><strong className="text-slate-200">.gitignore</strong>: Ignora node_modules, dist y temporales.</li>
            </ul>
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            onClick={onClose}
            className="bg-cyan-500 hover:bg-cyan-400 text-black font-sc2-display font-bold text-xs uppercase px-5 py-2 rounded transition"
          >
            Entendido, volver a la Armería
          </button>
        </div>
      </div>
    </div>
  );
};
