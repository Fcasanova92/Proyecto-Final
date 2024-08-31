import fs from 'fs';
export const handleFileOperation = async (path, data = null) => {
    try {
        const filePath = `${path}/db/carts.json`;


        await fs.promises.access(filePath).catch(async () => {
            await fs.promises.writeFile(filePath, JSON.stringify([], null, 2));
        });


        if (data !== null) {
            await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2));
        }


        const fileContent = await fs.promises.readFile(filePath, "utf-8");
        return JSON.parse(fileContent);

    } catch (error) {
        throw new InternalServerError(error.message);
    }
};