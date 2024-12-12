import Prompt from "../../../models/prompt";
import { connectToDB } from "../../../utils/database";


export async function DELETE(req){
  try{
    const {id} = await req.json();

    await connectToDB();
    const prompts = await Prompt.deleteOne({_id: id});

    return new Response(JSON.stringify(prompts), {status: 200});


  }
  catch(error){
    console.log(error);
  }
}