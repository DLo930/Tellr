import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

const styles = StyleSheet.create({
    change: {
        height: 400,
        position: "relative",
        flexDirection: "column",
        alignItems: "center",
        padding: 50
    },
    atm: {
        height: 400,
        position: "relative",
        flexDirection: "column",
        alignItems: "center",
    },
    inner: {
        height: 400,
        width: 400,
        padding: 40,
        position: "relative",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#307FEA"
    },
    card: {
        marginTop: 25,
        marginBottom: 50,
    },
    atmtext: {
        textAlign: "center",
        color: "#fff",
        fontFamily: "Avenir",
        fontSize: 30,
        fontWeight: "bold"
    }
});
export default class AtmSelectionChal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: 'Press the change button to find location',
            counter: 0,
            address: {
                "state": "VA",
                "zip": "22207",
                "city": "Arlington",
                "street_name": "Lee Highway",
                "street_number": "4700"
            }
        }
    }
    render()
    {
        return(
            <React.Fragment>
                <TouchableOpacity onPress={this.displayAtm}>
                    <View style={styles.change}>
                        <Image source={require('./assets/change.png')} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.push('Card')}>
                    <View style={styles.atm}>
                        <View style={styles.inner}>
                            <Image style={styles.card} source={require('./assets/atm.png')}/>
                            <Text style={styles.atmtext}>
                                {
                                this.state.name + ' at ' +
                                this.state.address.street_number + ' ' + 
                                this.state.address.street_name + ' ' +
                                this.state.address.city + ' '}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </React.Fragment>
        );
    }
    displayAtm = () => {
        
        const url = "http://api.reimaginebanking.com/atms?"
        const lat = "38.9283";
        const lng = "-77.1753"; 
        const rad = "3"; 
        const key = "0a317ccb3fe11979ba8dfe5572000f77";
        fetch(url+"lat="+lat+"&lng="+lng+"&rad="+rad+"&key="+key)
        .then((response) => response.json())
        .then((responseJson) => {
        this.setState({
            name: responseJson.data[this.state.counter].name, 
            counter: this.state.counter + 1,
            });
        let past_address = {
            "state": responseJson.data[this.state.counter].address.state,
            "zip": responseJson.data[this.state.counter].address.zip,
            "city": responseJson.data[this.state.counter].address.city,
            "street_name": responseJson.data[this.state.counter].address.street_name,
            "street_number": responseJson.data[this.state.counter].address.street_number
        };
        this.setState({
            address: past_address,
        });
        })
        .catch((error) => {
        console.error(error);
        });
    }
}