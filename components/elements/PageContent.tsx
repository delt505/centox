import Meta from "./Meta";
import Appshell from "../pages/appshell/Appshell";

export default function PageContent({ title, admin, children }: { title?: string, admin?: boolean, children: any}) {
    return (
        <>
            <Appshell admin={admin}>
                {title && <Meta title={title} />}
                {children}
            </Appshell>
        </>
    )
}