import firebase from 'firebase';

export const fetchItems = async () => {
    let items = []
    try {
        const stuff = await firebase.firestore().collection("items").get()
            const item = stuff.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            return JSON(item);
    } catch (error) {
        console.log(error)
    }
}