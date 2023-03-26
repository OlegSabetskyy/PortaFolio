let tableData = [
    {
        id: 1,
        name: "Name",
        surname: "Surname",
        email: "email@email.com",
        phone: "+34 123 45 67 89",
        country: "Spain"
    },
    {
        id: 2,
        name: "Name2",
        surname: "Long surname ver",
        email: "some-long-ema@hotmail.com",
        phone: "+34 123 45 67 89",
        country: "Spain2"
    },
    {
        id: 3,
        name: "Name3",
        surname: "Surname3",
        email: "email3@email.com",
        phone: "+34 123 45 67 89",
        country: "Spain3"
    }
];
tableData = [
    ...tableData,
    ...tableData,
    ...tableData,
    ...tableData,
    ...tableData,
    ...tableData,
    ...tableData,
    ...tableData,
    ...tableData,
    ...tableData
];

export { tableData };
