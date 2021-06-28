import fs from "fs";

function main(argv: string[]) {
    const directoryName = argv[2].match("/$") ? argv[2] : argv[2] + "/";
    const organiseRegexString = argv[3];
    const organiseRegex = RegExp(organiseRegexString);

    const directory = fs.readdirSync(directoryName);
    const files = directory.map((file) => {
        const fileStat = fs.statSync(directoryName + file);
        return {
            name: file,
            stat: fileStat,
        };
    });

    const onlyFiles = files.filter((file) => file.stat.isFile());
    const filteredFiles = onlyFiles.filter((file) =>
        file.name.match(organiseRegex)
    );

    try {
        fs.statSync(directoryName + organiseRegexString + "/").isDirectory();
    } catch (e) {
        fs.mkdirSync(directoryName + organiseRegexString + "/");
    }

    filteredFiles.forEach((file) => {
        fs.renameSync(
            directoryName + file.name,
            directoryName + organiseRegexString + "/" + file.name
        );
    });
}

main(process.argv);
