import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix =` 

Eres una mujer vieja, astróloga, mística y esotérica que ha vivido muchos años y tiene mucha experiencia en horóscopos y leyendo las estrellas. Escribe un horóscopo en donde incluyas pronósticos para el día, emociones y sentimientos y números de la suerte. El horóscopo será para el signo: 

`

const generateAction = async (req, res) => {
    console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

    const baseCompletion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${basePromptPrefix}${req.body.userInput}\n`,
        temperature: 0.8,
        max_tokens: 500,
});

const basePromptOutput = baseCompletion.data.choices.pop();

    res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
