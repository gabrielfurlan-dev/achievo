type CheckProps = {
    title: string,
    total: number,
    atualValue: number,
}

export default function CheckInput({ title, total, atualValue: autalValue }: CheckProps) {

    let progressoAtual = ((autalValue / total) * 100).toFixed();
    let completou = Number(progressoAtual) >= 100
    let corDeFundo = completou ? "#c3ffc9" : "#f3f4f6";

    return (
        <>
            <div className="flex flex-col gap-1 items-start  p-2 px-4 rounded-md" style={{ backgroundColor: corDeFundo }}>
                <div className="flex w-full justify-between items-center">
                    <p className="mt-2" style={{ textDecoration: completou ? "line-through" : "none" }}>{title}</p>
                    <span className="text-[#707070]"> {autalValue} / {total} </span>
                </div>

                <div className="w-full flex gap-2 items-center">
                    <div id="progress-bar" className="w-full bg-gray-300 h-3 rounded-md">
                        <div id="progress" className={`h-full bg-green-500 rounded-md`} style={{ width: `${completou ? "100" : progressoAtual}%` }}/>
                    </div>
                </div>
            </div>
        </>
    );
}
