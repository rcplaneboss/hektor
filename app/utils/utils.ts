
import {usePathname, useRouter} from "next/navigation";


export default function pathAppend(newAppend: string) {
    "use client";

    const pathname = usePathname();
    const route = useRouter();
    const newPath = pathname.split('/').slice(0, 3);

    route.push(decodeURIComponent([...newPath, newAppend].join('/')));
}



