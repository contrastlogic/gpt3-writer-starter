import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration ({
	apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = 
	`Write a sarcastic response declining the message with an absurd response. If a name is included and an emoji or middle initial follows with too many periods, they copy and pasted the name. The sender is a robot and should be shamed for not being human. Do not include any human names that I include. Address the sender as "Robot" or some other mockery. Provide a comedic tip for robots to appear more human. Make sure to respond to any questions with a nonsense response. Format the response as follows:
	
	Greeting

	Message

	Close with a slightly condescending signature followed by
	[Your Name]. 
	`;

const generateAction = async (req, res) => {
	// Run first prompt
	//console.log(`API: ${basePromptPrefix}${req.body.userInput}`);
	//console.warn(basePromptPrefix);

	const baseCompletion = await openai.createCompletion({
		model: 'text-davinci-003',
		prompt: `${basePromptPrefix}${req.body.userInput}\n`,
		temperature: 0.9,
		max_tokens: 818,
	});

	const basePromptOutput = baseCompletion.data.choices.pop();

	//console.dir(basePromptOutput);

	res.status(200).json({output: basePromptOutput});

};

export default generateAction;