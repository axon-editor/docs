import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { SidebarActiveIndicator } from '@/components/docs/sidebar-active-indicator';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      {...baseOptions()}
      githubUrl={undefined}
      themeSwitch={{ enabled: false }}
    >
      <SidebarActiveIndicator />
      {children}
    </DocsLayout>
  );
}
