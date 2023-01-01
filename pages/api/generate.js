import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration ({
	apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = 
`What type of strain would be best suited for the experience listed below. Explain, in list format, what terpenes are favorable for this experience and which ones are unfavorable. Provide a one-line sentence description that links the terpene to the desired experience or unwanted effects. Provide a short list of cannabis strain names that match the desired experience. Conclude with a brief summary of the desired effect and the listed terpenes. Explain as simply as possible why the focus should be on terpenes and not strain type. The tone should remain at a fifth grade reading level that feels conversational and intellegent. Do not use the term marijuana, replace it with cannabis.

Format your response according to the example below with line breaks and bolded headlines included:

Strain Type: 

Description: 

Look for these terpenes:

Stay away from these terpenes:

Recommended Strain Names:

Summary:

Desired Experience:
`;

const generateAction = async (req, res) => {
	// Run first prompt
	//console.log(`API: ${basePromptPrefix}${req.body.userInput}`);
	console.warn(basePromptPrefix);

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