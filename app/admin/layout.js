import AdminLayoutWrapper from '@/components/admin/AdminLayoutWrapper';
import './admin.css';

export default function AdminPageLayout({ children }) {
  return <AdminLayoutWrapper>{children}</AdminLayoutWrapper>;
}
