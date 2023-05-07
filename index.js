const express = require('express');
const mongoose = require('mongoose');
const addata = require('./models/ads-Schema');
const companydata = require('./models/company-Schema');
const ObjectId = mongoose.Types.ObjectId;


const cors = require('cors');

const app = express();
const port = process.env.PORT || 8000;
app.use(cors());
app.use(express.json())

mongoose
  .connect("mongodb+srv://dhotar10:dhotar10@cluster0.vcqdvki.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Connected to MongoDB`))
  .catch((error) => console.error('MongoDB connection error:', error.message));



//

app.get('/api/ads', async (req, res) => {
  try {
    const keyword = req.query.searchTerm;
    const regex = new RegExp(keyword, 'i');

    const ads = await addata.aggregate([
      {
        $lookup: {
          from: 'companies',
          localField: 'companyId',
          foreignField: '_id',
          as: 'company'
        }
      },
      {
        $match: {
          $or: [
            { 'company._id': keyword },
            {'company.company_Name':regex},
            { primaryText: regex },
            { headline: regex },
            { description: regex },
          ]
        }
      },
      {
        $project: {
          _id: 0,
          company_Name: '$company.company_Name',
          primaryText: 1,
          headline: 1,
          description: 1,
          imageUrl: 1,
          CTA:1,
          company_link:'$company.company_link'
        }
      }
    ]);

    res.json(ads);
  } catch (error) {
    console.error('Error while fetching ads:', error.message);
    res.status(500).send('Internal Server Error');
  }
});





app.listen(port, () => console.log(`Server listening on port ${port}`));
