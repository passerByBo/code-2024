import {useState, useEffect, useTransition, Suspense} from 'react'

// 模拟一个异步获取数据的函数
const fetchData = (resource:string) : Promise<string>=> {
    return new Promise(resolve =>  setTimeout(() => resolve(`Data fetched: ${resource}`), 2000))
}

const DataComponent: React.FC<{resource: string}> = ({resource}) => {

    const {data, setData} = useState<string | null>(null)

    useEffect(() => {
        fetchData(resource).then(fetchData => {
            setData(fetchData)
        })
    }, [resource])


    if(!data) {
        return <span>loading....</span>
    }

    return <div>{data}</div>
}


const MyConponent:React.FC = () => {
    const [resource, setResource] = useState<string>('initial resource')
    const [startTransition, isPending] = useTransition()

    const handleClick = (nextResource: string) => {
        startTransition(() => {
            setResource(nextResource)
        })
    }

    return (
        <div>
            <button onClick={() => handleClick(' next resource')} disabled={isPending}>load Next Resource</button>
            <Suspense fallback={<h1>Loading...</h1>}>
                <DataCoomponent resource={resource}></DataCoomponent>
            </Suspense>
        </div>
    )

}