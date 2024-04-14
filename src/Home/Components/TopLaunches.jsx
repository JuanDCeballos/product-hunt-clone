export const TopLaunches = () => {
    return (
        <>
            <div className="flex flex-col space-y-4">
                <h2 className="font-medium text-lg"> Top Launches </h2>

                <div className="flex flex-col space-y-2">
                    <h3 className="font-medium select-none"> Today's winner </h3>
                    <h3 className="font-medium select-none"> Yesterday's winner </h3>
                    <h3 className="font-medium select-none"> Last Week's winner </h3>
                    <h3 className="font-medium select-none"> Last Month's winner </h3>
                </div>

                <hr />
            </div>

        </>
    );
};