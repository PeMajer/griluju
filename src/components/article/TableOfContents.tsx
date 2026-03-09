import { type Locale, t } from "@/lib/i18n";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  items: TocItem[];
  locale: Locale;
}

export function TableOfContents({ items, locale }: TableOfContentsProps) {
  if (items.length === 0) return null;

  return (
    <nav className="mb-8 rounded-lg border border-gray-200 bg-gray-50 p-4">
      <h2 className="mb-3 text-sm font-semibold text-gray-900">
        {t(locale, "article.toc")}
      </h2>
      <ul className="space-y-1">
        {items.map((item) => (
          <li
            key={item.id}
            style={{ paddingLeft: `${(item.level - 2) * 16}px` }}
          >
            <a
              href={`#${item.id}`}
              className="text-sm text-gray-600 hover:text-orange-600 transition-colors"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
