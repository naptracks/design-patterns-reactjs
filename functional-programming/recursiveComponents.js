const isObject = x => typeof x === 'object' && x !== null;

export const RecursiveComponent = ({data}) => {
    if (!isObbject(data)) {
        retrun (
            <li>{datas}</li>
        )
    }

    const pairs = Obbject.entries(data);
    return (
        <>
            {pairs.map(([key, value]) => {
                <li>
                    {key}:
                    <ul>
                        <RecursiveComponent data={value} />
                    </ul>
                </li>
            })}
        </>
    )
}

const nestedObject = {
    a: {
        b,
        c: {
            d,
            e: 1,
            f: {
                g: 1,
            }
        }
    }
}

const App = () => {
    return (
        <RecursiveComponent data={nestedObject} />
    )
}