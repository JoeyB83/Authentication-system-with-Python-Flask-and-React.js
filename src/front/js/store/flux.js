const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			verifieUser: false,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			getToken: (email, password) => {
				fetch(process.env.BACKEND_URL + '/api/token',{
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						email: email,
						password: password
					}),
					redirect: "follow"
				})
				.then(response => response.json())
				.then(result => {
					sessionStorage.setItem("token", result.token)
					setStore({token: result.token})})
				.catch(err => console.log(err));
			},

			getVerified: () => {
				fetch(process.env.BACKEND_URL + '/api/protected',{
					method: 'GET',
						headers: {
							"Authorization": "Bearer " + getStore().token
						},						
						redirect: "follow"
				})
				.then((res) => res.ok ? setStore({verifieUser: true}):"")
				.catch((err) => console.log(err));
			},

			createUser: (email, password, is_active) => {
				fetch(process.env.BACKEND_URL + '/api/signup',{
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						email: email,
						password: password,
						is_active: is_active
					}),
					redirect: "follow"
				})
				.then(response => response.json())
				.then(data=>{console.log('Succes: ',data)})
				.catch(err => console.log(err));
			},
			// exampleFunction: () => {
			// 	getActions().changeColor(0, "green");
			// },

			syncTokenFromSessionStore: () => {
				const token = sessionStorage.getItem("token");
				console.log("Aplication just loaded, synching the session storage token")
				if (token && token!="" && token != undefined) setStore({ token: token});
			},

			logout: () => {
				sessionStorage.removeItem("token");
				console.log("Login out")
				setStore({ token: null});
				setStore({verifieUser: false})				
			},

			// login: async (email, password) => {
			// 	const opts = {
			// 		method: "POST",
			// 		headers: {
			// 			"Content-Type": "application/json"
			// 		},
			// 		body: JSON.stringify({
			// 			"email": email,
			// 			"password": password
			// 		})
			// 	};

			// 	try{
			// 		const resp = await fetch("https://3001-4geeksacade-reactflaskh-8i7x41mrwnz.ws-us77.gitpod.io/api/token", opts)
			// 		if(resp.status !== 200){
			// 			alert("There has been some error");
			// 			return false;
			// 		}
					
			// 		const data = await resp.json();
			// 		console.log("this came from the backend", data)
			// 		sessionStorage.setItem("token", data.access_token)
			// 		setStore({ token: data.access_token})
			// 		return true;					
			// 	}
			// 	catch(error){
			// 		console.error("There has been an error login in")
			// 	}
			// },

			// getMessage: async () => {
			// 	const store = getStore();
			// 	const opts = {
			// 		headers: {
			// 			"Authorization": "Bearer " + store.token
			// 		}
			// 	}
			// 	try{
			// 		// fetching data from the backend
			// 		const resp = await fetch("https://3001-4geeksacade-reactflaskh-8i7x41mrwnz.ws-us77.gitpod.io/api/hello", opts)
			// 		const data = await resp.json()
			// 		setStore({ message: data.message })
			// 		// don't forget to return something, that is how the async resolves
			// 		return data;
			// 	}catch(error){
			// 		console.log("Error loading message from backend", error)
			// 	}
			// },
			// changeColor: (index, color) => {
			// 	//get the store
			// 	const store = getStore();

			// 	//we have to loop the entire demo array to look for the respective index
			// 	//and change its color
			// 	const demo = store.demo.map((elm, i) => {
			// 		if (i === index) elm.background = color;
			// 		return elm;
			// 	});

			// 	//reset the global store
			// 	setStore({ demo: demo });
			// }
		}
	};
};

export default getState;
