/* Config Sample
 *
 * For more information on how you can configure this file
 * see https://docs.magicmirror.builders/configuration/introduction.html
 * and https://docs.magicmirror.builders/modules/configuration.html
 *
 * You can use environment variables using a `config.js.template` file instead of `config.js`
 * which will be converted to `config.js` while starting. For more information
 * see https://docs.magicmirror.builders/configuration/introduction.html#enviromnent-variables
 */

let config = {
	address: "localhost",	// Address to listen on, can be:
							// - "localhost", "127.0.0.1", "::1" to listen on loopback interface
							// - another specific IPv4/6 to listen on a specific interface
							// - "0.0.0.0", "::" to listen on any interface
							// Default, when address config is left out or empty, is "localhost"
	port: 8080,
	basePath: "/",	// The URL path where MagicMirror² is hosted. If you are using a Reverse proxy
									// you must set the sub path here. basePath must end with a /
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"],	// Set [] to allow all IP addresses
									// or add a specific IPv4 of 192.168.1.5 :
									// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
									// or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
									// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	useHttps: false,			// Support HTTPS or not, default "false" will use HTTP
	httpsPrivateKey: "",	// HTTPS private key path, only require when useHttps is true
	httpsCertificate: "",	// HTTPS Certificate path, only require when useHttps is true

	language: "en",
	locale: "en-US",   // this variable is provided as a consistent location
			   // it is currently only used by 3rd party modules. no MagicMirror code uses this value
			   // as we have no usage, we  have no constraints on what this field holds
			   // see https://en.wikipedia.org/wiki/Locale_(computer_software) for the possibilities

	logLevel: ["INFO", "LOG", "WARN", "ERROR"], // Add "DEBUG" for even more logging
	timeFormat: 24,
	units: "metric",

	modules: [
		{
			module: "compliments",
			position: "top_bar",
			config: {
				compliments: {
					anytime: [
						"Welcome to the Mirror of Noitceles",
						"Making every selection magical"
					]
				}
			}
		},
		{
			module: "MMM-Dataverse",
			position: "bottom_right",
		},
		{
            module: "MMM-SimpleLogo",
            position: "bottom_left",
            config: {
                imagePaths: [
                    "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGozcmxwdDRpaHA0ZHhqMjcxaTBtMDRiY2t5MnR4d3I0dWlseGF0diZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/I4fFwkUIRecoObpmzU/giphy.gif",
                    "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3QxdG92em05MTJ1M2dhZnlyZTJycWNtOHZyYWI3cjlsMXUxYjNpYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/UU4ichdd14PYtCUKmK/giphy.gif",
                    "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHdveDJvdnNyOGtoemNxcjJ5ZnkzejNwZ2dqbHR2aHA1M2J5dHo4YyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/ACzX3DubliNxmW5sHM/giphy.gif",
					"https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGc4dmNsN2JjNnZjeHMxdzk2MzV6bWVvZnNicWxlbGI0YW5kN2NreCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/XjJW4JV9sKgJ2Qpimp/giphy.gif",
					"https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHM1aWtvbWY5aDZodHhjYmo0cDgxOTU5dW1lODlpeTI1bTFzMjZubiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/uygHNAvyHf8FjG4zoI/giphy.gif", 
					"https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGxlYnZycXQ3YTNsOWoyb3VhdHQ1NmlwMnd5a2R3aW5mNDRyN2J2byZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/TitLQY80vZgrK/giphy.gif", 
					"https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExczF6NzZlemttenk3OXc4YmRscmQxYWJ6NDQzd2plcXdmemtiZW9lZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/2vQBlQkJOyK3u/giphy.gif", 
					"https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGJ4ZHB5N2h1d25xcGdtY2VsZ3B4aGNuOXhjOGd5eXY5MnJ2N3k4ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/bTe32xXeAPTNeLg91T/giphy.gif"
                ],
                height: "500px"
            }
        },
		{
			module: "compliments",
			position: "bottom_bar"
		},
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") { module.exports = config; }
