"use client";

interface MailLinkProps {
  className?: string;
  children?: React.ReactNode;
}

// Email is assembled at runtime via JS — static scrapers cannot extract it from HTML
export function MailLink({ className, children }: MailLinkProps) {
  const parts = ["info", "griluju", "cz"];
  const email = `${parts[0]}@${parts[1]}.${parts[2]}`;
  return (
    <a href={`mailto:${email}`} className={className}>
      {children ?? email}
    </a>
  );
}
