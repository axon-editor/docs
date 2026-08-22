import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import {
  axonDocsSidebarSlots,
  DocsSidebarBanner,
  DocsSidebarFooter,
} from '@/components/docs/axon-docs-sidebar';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      {...baseOptions()}
      githubUrl={undefined}
      themeSwitch={{ enabled: false }}
      slots={{ sidebar: axonDocsSidebarSlots }}
      sidebar={{
        banner: <DocsSidebarBanner />,
        footer: <DocsSidebarFooter />,
      }}
    >
      {children}
    </DocsLayout>
  );
}
