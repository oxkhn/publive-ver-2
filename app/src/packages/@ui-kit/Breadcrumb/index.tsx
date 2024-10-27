"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface BreadcrumbProps {
  title?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = (props) => {
  const { title } = props;
  const router = useRouter();

  const pathArray = usePathname()
    .split("/")
    .filter((path) => path);

  return (
    <nav className="my-4 text-sm">
      <ul className="flex items-center space-x-2">
        <li>
          <Link href="/" className="normal-case text-grays/50">
            Home
          </Link>
        </li>
        {pathArray.map((path, index) => {
          const href = "/" + pathArray.slice(0, index + 1).join("/");
          const isLast = index === pathArray.length - 1;

          return (
            <li key={href} className="flex items-center space-x-2 capitalize">
              <span>/</span>
              {isLast ? (
                <span className="text-primary">{title || path}</span>
              ) : (
                <Link href={href} className="text-grays/50">
                  {path}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
