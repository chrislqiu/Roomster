const mongoose = require('mongoose');
const Property = require('./models/property');
const fetch = require('node-fetch');

const uri = 'mongodb+srv://chrisqiu52:oe7O2bahWRmXJjOp@cluster0.xe4cgpv.mongodb.net/DB?retryWrites=true&w=majority';
const apiKey = '9a33030d18d9c0db7023221f2cc438c3';


mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

async function updateCoordinates() {
    try {
        const properties = await Property.find({});

        for (const propertyData of properties) {
            console.log(propertyData.propertyInfo.address)
            const refineSearch = `${propertyData.propertyInfo.address}, Indiana`;

            const response = await fetch(
                `http://api.positionstack.com/v1/forward?access_key=${apiKey}&query=${encodeURIComponent(refineSearch)}`
            );

            const result = await response.json();

            if (result.data.length > 0) {
                const newLatitude = result.data[0].latitude;
                const newLongitude = result.data[0].longitude;

                await Property.updateOne(
                    { _id: propertyData._id },
                    {
                        $set: {
                            'propertyInfo.latitude': newLatitude,
                            'propertyInfo.longitude': newLongitude,
                        },
                    }
                );

                console.log(`Updated coordinates for property: ${propertyData._id}`);
            } else {
                console.log(`Could not find coordinates for property: ${propertyData._id}`);
            }
        }

        console.log('All properties updated');
        console.log(properties.length)
    } catch (error) {
        console.error('Error:', error);
    } finally {
        // Add any necessary cleanup here
    }
}

// Call the updateCoordinates function
updateCoordinates();
