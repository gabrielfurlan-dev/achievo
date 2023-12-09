import { IResponseData } from "@/interfaces/iResponseData";

export async function addGoalTag(goalId: number, tagId:number){

    const response = await fetch("/api/tag/add-goal-tag", {
        method: "POST",
        body: JSON.stringify({ goalId, tagId }),
        headers: { "Content-Type": "application/json" },
    });

    return await response.json() as IResponseData;
}
