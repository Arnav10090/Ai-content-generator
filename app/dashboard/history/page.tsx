import { db } from '@/utils/db';
import { AIOutput } from '@/utils/schema';
import Templates from '@/app/(data)/Templates';
import { desc, eq } from 'drizzle-orm';
import HistoryTable from './HistoryTable';
import { currentUser } from '@clerk/nextjs/server';

function getTemplateMeta(slug: string) {
  const t = Templates.find(t => t.slug === slug);
  return t ? { name: t.name, icon: t.icon } : { name: slug, icon: '' };
}

export default async function HistoryPage() {
  const user = await currentUser();
  if (!user) {
    return <div>Not logged in</div>;
  }

  const history = await db.select()
    .from(AIOutput)
    .where(eq(AIOutput.createdBy, user.primaryEmailAddress?.emailAddress || ''))
    .orderBy(desc(AIOutput.id));

  // Map DB rows to display rows
  const rows = history.map(row => {
    const { name, icon } = getTemplateMeta(row.templateSlug as string);
    return {
      template: name,
      icon,
      aiResp: row.aiResponse || '',
      date: row.createdAt || '',
      words: row.aiResponse ? row.aiResponse.split(/\s+/).length : 0,
    };
  });

  return (
    <div className="w-full h-full min-h-[calc(100vh-0px)]">
      <div className="w-full h-full bg-white rounded-none shadow-none p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">History</h1>
            <p className="text-gray-500 text-sm">Search your previously generated AI content</p>
          </div>
          {/* Search bar can be implemented with client component if needed */}
        </div>
        <HistoryTable rows={rows} />
      </div>
    </div>
  );
} 