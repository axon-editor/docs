import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, gitConfig } from './shared';
import Image from 'next/image';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="flex items-center gap-2.5 font-semibold tracking-tight">
          <Image src="/media/icons/axon.png" alt="" width={24} height={24} className="rounded-md" />
          {appName}
          <span className="rounded-md border border-[#f0a06b]/20 bg-[#f0a06b]/[0.07] px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#f0a06b]">Docs</span>
        </span>
      ),
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
