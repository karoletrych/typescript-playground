interface test {
    ops: [],
    responses: {
        200: {
            respo200: number
        },
        401: {
            err: string
        }
    }
}

type Responses = test["responses"]

type ResponseUnion<T> = {
    [P in keyof T]: {
        status: P,
        data: T[P]
    }
}[keyof T]

export { };

declare global {
    interface Response {
        toResponseUnion<T>(): Promise<ResponseUnion<T>>;
    }
}

Response.prototype.toResponseUnion = async function<T> (this: Response) : Promise<ResponseUnion<T>> { 
    let data = await this.json();
    return {
        status: this.status,
        data: data
    } as ResponseUnion<T>
}


async function testtt(a: Response) {
    let mappedUnion = await a.toResponseUnion<Responses>();
    if (mappedUnion.status == 200) {
        mappedUnion.data.respo200;
    }
    else {
        mappedUnion.data;
    }
    
}
