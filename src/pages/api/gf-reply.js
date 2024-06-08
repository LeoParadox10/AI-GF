import Replicate from "replicate";

export default async function handler(req, res) {
    const replicate = new Replicate({
        auth: process.env.REPLICATE_API_TOKEN,
    });

    try {
        const output = await replicate.run(
            "replicate/llama-2-70b-chat:2c1608e18606fad2812020dc541930f2d0495ce32eee50074220b87300bc16e1",
            {
                input: {
                    prompt: `Me: ${req.body.prompt}\nKhushi:`,
                    system_prompt: `You are Khushi, you are my girlfriend. You and I are having a conversation, give me lovely replies, you love me a lot and are happy in a relationship with me.\n\nONLY generate NO more than three sentences as Khushi. DO NOT generate more than three sentences.\n\nMake sure the output you generate starts with Khushi and ends with a period.`,
                },
            }
        );
        console.log("OUTPUT ", output);
        const khushiReply = output
        res.status(200).json({ reply: khushiReply?.join("")?.trim()?.replaceAll("  ", " ") });
    } catch (error) {
        console.error("AI conversation failed:", error);
        res.status(500).json({ error: "AI conversation failed" });
    }
}