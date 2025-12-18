'use server';

/**
 * @fileOverview A flow for predicting hourly weather conditions using historical data and current weather API data.
 *
 * - hourlyWeatherPrediction - A function that predicts hourly weather conditions.
 * - HourlyWeatherPredictionInput - The input type for the hourlyWeatherPrediction function.
 * - HourlyWeatherPredictionOutput - The return type for the hourlyWeatherPrediction function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const HourlyWeatherPredictionInputSchema = z.object({
  city: z.string().describe('The city to predict weather for.'),
  currentWeather: z.string().describe('Current weather conditions for the city.'),
  historicalWeatherData: z.string().describe('Historical weather data for the city.'),
});
export type HourlyWeatherPredictionInput = z.infer<typeof HourlyWeatherPredictionInputSchema>;

const HourlyWeatherPredictionOutputSchema = z.object({
  hourlyForecast: z.string().describe('A list of likely weather conditions for the current hour.'),
});
export type HourlyWeatherPredictionOutput = z.infer<typeof HourlyWeatherPredictionOutputSchema>;

export async function hourlyWeatherPrediction(input: HourlyWeatherPredictionInput): Promise<HourlyWeatherPredictionOutput> {
  return hourlyWeatherPredictionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'hourlyWeatherPredictionPrompt',
  input: {schema: HourlyWeatherPredictionInputSchema},
  output: {schema: HourlyWeatherPredictionOutputSchema},
  prompt: `You are a weather forecasting expert. Given the current weather conditions and historical weather data for a city, predict the likely weather conditions for the current hour.  Return a concise list of likely weather conditions.

City: {{{city}}}
Current Weather: {{{currentWeather}}}
Historical Weather Data: {{{historicalWeatherData}}}

Hourly Forecast:`,
});

const hourlyWeatherPredictionFlow = ai.defineFlow(
  {
    name: 'hourlyWeatherPredictionFlow',
    inputSchema: HourlyWeatherPredictionInputSchema,
    outputSchema: HourlyWeatherPredictionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
