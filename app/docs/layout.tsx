import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { SidebarActiveIndicator } from '@/components/docs/sidebar-active-indicator';
import type { CSSProperties } from 'react';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      {...baseOptions()}
      githubUrl={undefined}
      themeSwitch={{ enabled: false }}
      containerProps={{
        style: { '--fd-sidebar-width': '232px' } as CSSProperties,
      }}
    >
      <SidebarActiveIndicator />
      {children}
    </DocsLayout>
  );
}
