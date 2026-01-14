export default function VideoText({
    title = "Making of Today's Menu",
}: {
    title?: string;
}) {
    return (
        <div className="pointer-events-none select-none z-10">
            <h1 className="text-4xl text-transparent font-bold bg-clip-text bg-gradient-to-b from-neutral-200 to-neutral-600 dark:from-neutral-200 dark:to-neutral-500 font-heading">
                {title}
            </h1>
        </div>
    );
}
