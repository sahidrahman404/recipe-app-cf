const toCamelCase = <Val extends String, Row extends Object>(rows: any[]) => {
    return rows?.map((row) => {
        const replaced: { [key: string]: Val } = {};

        for (let key in row) {
            const camelCase = key.replace(/([-_][a-z])/gi, (val) =>
                val.toUpperCase().replace("_", "")
            );

            replaced[camelCase] = row[key as keyof Row];
        }

        return replaced;
    });
};

export default toCamelCase;
