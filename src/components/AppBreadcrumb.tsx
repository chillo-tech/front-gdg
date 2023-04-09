import React, {useMemo} from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { capitalize } from '@/utils';

function AppBreadcrumb() {
  const labelFromText = (text: string) => {
    return text.split('-').filter((item: any) => isNaN(item)).join(' ');
  }
	const router = useRouter();
	// this is the same "generateBreadcrumbs" function, but placed
	// inside a "useMemo" call that is dependent on "router.asPath"
	const breadcrumbs = useMemo(function generateBreadcrumbs() {
		const asPathWithoutQuery = router.asPath.split("?")[0];
		const asPathNestedRoutes = asPathWithoutQuery.split("/").filter(v => v.length > 0);

		const crumblist = asPathNestedRoutes.map((subpath, idx) => {
			const href = "/" + asPathNestedRoutes.slice(0, idx + 1).join("/");
			return { href, text: subpath };
		})

		return [{ href: "/", text: "Accueil" }, ...crumblist];
	}, [router.asPath]);
	return (
		<div className="text-ellipsis truncate text-xl py-8 container overflow-hidden flex items-center justify-center">
			<ul className="text-app-yellow font-extralight inline-flex mx-auto">
		  {breadcrumbs
			.map((item: any, key: number) =>
			  <li key={`item-${item.text}-${key}`}>
				 {key < breadcrumbs.length -1 ?
				  (
					<Link href={`${item.href}`}
					  className="text-app-yellow">
					  {capitalize(labelFromText(item.text))}
					</Link>
				  ) :
				   (
					<span
					  className="app-light-gray">
					  {capitalize(labelFromText(item.text))}
					</span>
				   )
				  }
				  {key < breadcrumbs.length -1 ? <span className="mx-1">&gt;</span> : null }
			  </li>
			)}
		</ul>
		</div>
	);
}

export default AppBreadcrumb;
