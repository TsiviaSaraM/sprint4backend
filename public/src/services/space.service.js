// import { httpService } from './http.service.js';
import { storageService } from './async-storage.service.js';
import { utilService } from './util.service.js';
import { filterService } from './filterFunctions.js';
const SPACE_KEY = 'space';

export const spaceService = {
  query,
  remove,
  save,
  getEmptySpace,
  getById,
};

_createSpaces();

async function query(filterBy) {
  // return storageService.query(SPACE_KEY);
  console.log('filter in service', filterBy);
  try {
    let spaces = await storageService.query(SPACE_KEY);
    const spacesForDisplay = await filterService.getSpacesForDisplay(
      spaces,
      filterBy
    );
    return spacesForDisplay;
  } catch (err) {
    console.log('error getting spaces in service', this.filterBy);
    throw err;
  }

  return spaces;
}

function remove(spaceId) {
  return storageService.remove(SPACE_KEY, spaceId);
}

function save(space) {
  if (space._id) {
    console.log('savingn space', space);
    return storageService.put(SPACE_KEY, space);
  } else {
    return storageService.post(SPACE_KEY, space);
  }
}

async function getById(spaceId) {
  const space = await storageService.get(SPACE_KEY, spaceId);
  return space;
}

function getEmptySpace() {
  return {
    // _id: 's' + utilService.makeId(),
    name: '',
    imgUrls: [
      //TODO change this when we start using cloudinary
      'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=753&q=80',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=753&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=753&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=753&q=80',
    ],
    price: 0,
    description: '',
    capacity: 6,
    amenities: [],
    type: 'home',
    host: {
      _id: '',
      fullname: '',
      imgUrl: '',
    },
    loc: {
      country: '',
      countryCode: '',
      address: '',
      lat: 0,
      lng: 0,
    },
    reviews: [
      //removed content because a new space has no reviews
      // {
      //   _id: '',
      //   txt: '',
      //   rate:{
      //     "cleanliness":2,
      //     "checkin":3,
      //     "communication":3,
      //     "accuracy":1,
      //     "value":5,
      //     "location":3
      //   },
      //   by: {
      //     _id: '',
      //     fullname: '',
      //     imgUrl: '',
      //   },
      // },
    ],
    likedByUserIds: [],
  };
}

async function _createSpaces() {
  let spaces = await storageService.query(SPACE_KEY);
  if (!spaces || !spaces.length) {
    spaces = [];

    // ==========================================================================
    // 1 ===========================================================================

    spaces.push({
      _id: 's' + utilService.makeId(),
      type: 'home',
      name: 'OAKTREEHOUSE - SLEEP IN THE TREEHOUSE',
      imgUrls: [
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626393518/sprint4/spaces/1%20-%20OAKTREEHOUSE%20-%20SLEEP%20IN%20THE%20TREEHOUSE/space/412e2eca-eddf-40fb-81b3-883335a894e0_l5hvxe.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626393518/sprint4/spaces/1%20-%20OAKTREEHOUSE%20-%20SLEEP%20IN%20THE%20TREEHOUSE/space/88473896-9f70-4c04-9f9b-68950f833c2b_fkebn3.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626393518/sprint4/spaces/1%20-%20OAKTREEHOUSE%20-%20SLEEP%20IN%20THE%20TREEHOUSE/space/b17c9174-3c3d-4e6e-8929-b5158b30c9c6_mwcdbp.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626393520/sprint4/spaces/1%20-%20OAKTREEHOUSE%20-%20SLEEP%20IN%20THE%20TREEHOUSE/space/a0f5c7cc-4d95-4843-889b-1f8ef5b2c873_u58prq.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626393518/sprint4/spaces/1%20-%20OAKTREEHOUSE%20-%20SLEEP%20IN%20THE%20TREEHOUSE/space/eba6db58-fb72-4791-a86a-e646f3dae6bc_ryxdaz.webp',
      ],
      price: 135,
      description: `TREEHOUSE is installed on four adult oaks. A wooden bridge leads directly to the terrace with a view of the surrounding trees. The house is connected to the electricity grid. Water is supplied in containers and is used for hand washing and basic hygiene. Inside our treehouse there is a chair and a sofa bed, basic kitchen equipment, electric kettle for water, plates etc. Dry toilet is located 15m from the treehouse. Attic is reserved for sleeping (2 people). Sofa bed is downstairs.
        The space
        Our tree house is designed for everyone who likes nature, would like to try, how it is to spend time during the day eg. sitting on the terrace or at night sleeping near trees at an altitude of almost 6 meters. We invite you to rest and “recharge the battery” in the unique atmosphere of the Little Carpathians. Youth, the elderly, families with children or couples – everyone is welcome. During your stay in our treehouse, your neighbors become squirrels, forest birds: titmouse, woodpeckers, cuckoos and other, stag beetle, salamanders, grass snakes, hedgehogs and seasonally skylights
        Other things to note
        We can rent two mountain bikes
        Garden shower`,
      capacity: 5,
      amenities: [
        'TV',
        'wifi',
        'bath',
        'kitchen',
        'free parking',
        'washing machine',
        'smoke alarm',
        'lockbox',
        'air conditioning',
        'security cameras',
      ],
      host: {
        _id: 'u101',
        fullname: 'Ania & Peter',
        imgUrl:
          'https://res.cloudinary.com/dymtestxz/image/upload/v1626393514/sprint4/spaces/1%20-%20OAKTREEHOUSE%20-%20SLEEP%20IN%20THE%20TREEHOUSE/host/169c278f-2716-4789-a7b3-44d4fccb5035_tjpzkc.webp',
      },
      loc: {
        country: 'Slovakia',
        countryCode: 'IL',
        address: 'Modra, Slovakia',
        lat: 48.334632,
        lng: 17.307569,
      },
      reviews: [
        {
          _id: 'r101',
          txt:
            'Perfection to a very tiny detail, one of a kind experience! We really enjoyed the stay and especially the great sleep in the middle of forrest :) Would definitely love to come back.',
          rate: 4,

          by: {
            _id: 'u894',
            fullname: 'Zuzana',
            imgUrl:
              'https://res.cloudinary.com/dymtestxz/image/upload/v1626393514/sprint4/spaces/1%20-%20OAKTREEHOUSE%20-%20SLEEP%20IN%20THE%20TREEHOUSE/reviewers/38be01af-b895-4932-b301-0deefa2786f0_sbucyq.webp',
          },
        },
        {
          _id: 'r102',
          txt: `Ania and Peter are sympathetic couple with inspirational life style what changed our staying to the more amazing experience. Thanks for nature which gave us beautiful sounds and my opinion is that we were at the right time in the right place. In May, nature wakes up, so it is even more of an experience to sleep in the treehouse. You must see! We liked it everything and the most outside shower with refreshing water. We are giving them 10 from 10.
          If you are nature lovers go and experience staying in OAKTREEHOUSE by your self. You can ask Ania and Peter what to do around, they will recommend it you hiking, biking, wine testing etc.`,
          rate: 4,
          by: {
            _id: 'u895',
            fullname: 'Anita',
            imgUrl:
              'https://res.cloudinary.com/dymtestxz/image/upload/v1626393517/sprint4/spaces/1%20-%20OAKTREEHOUSE%20-%20SLEEP%20IN%20THE%20TREEHOUSE/reviewers/86e81cda-2769-43cf-b76f-8b3901e36f3b_bvbvhb.webp',
          },
        },
        {
          _id: 'r103',
          txt: `A extraordinary experience! In my opinion A BIT PRICY! Probably better in summertime... It was my first stay in a house built on trees. My small daughter and I choose it to celebrate our personal father/daughter’s day. She loved it! The house is very well built, nice and clean. It is equipped with a sink, separated with a small door (not sure why!) but for the toilet you have to walk outside in a separate shack with compost type of “collection”! Not the most convenient in cold weather conditions or if you need to go in the night especially when you try in the dark to go down the ladder form the sleeping mezzanine... :/
          Peter was very helpful selecting the most dry wood from his stack which became humid with the rain and that helped a lot to start the fire for a nice evening barbecue. There’s not much to see or do in the area, but the house doesn’t really make you wanna go anywhere else. 1 night was ok... not sure October weather can allow more with an open air shower! All in all it was a memorable experience, but, as I said already, a bit pricy considering the services.`,
          rate: 4,
          by: {
            _id: 'u896',
            fullname: 'Onofrio',
            imgUrl:
              'https://res.cloudinary.com/dymtestxz/image/upload/v1626393514/sprint4/spaces/1%20-%20OAKTREEHOUSE%20-%20SLEEP%20IN%20THE%20TREEHOUSE/reviewers/2e56e461-97d5-46b8-b594-7a380e8da459_seopbd.webp',
          },
        },
        {
          _id: 'r104',
          txt: `Great location, nice people, good communication - definitly to recommend! We booked as a birthday surprise for friends and they have been super happy!`,
          rate: 4,
          by: {
            _id: 'u897',
            fullname: 'Florian',
            imgUrl:
              'https://res.cloudinary.com/dymtestxz/image/upload/v1626393514/sprint4/spaces/1%20-%20OAKTREEHOUSE%20-%20SLEEP%20IN%20THE%20TREEHOUSE/reviewers/2e7a5f78-744b-464d-9a49-3869bcc7600e_f3ku64.webp',
          },
        },
        {
          _id: 'r105',
          txt: 'sdvmlvs adklmalkm wfbhlwekjfn aejfnhkjs.',
          rate: {
            cleanliness: 2,
            checkin: 3,
            communication: 3,
            accuracy: 1,
            value: 5,
            location: 3,
          },
          by: {
            _id: 'u898',
            fullname: 'kslmv sojks',
            imgUrl:
              'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
          },
        },
        {
          _id: 'r106',
          txt: `Cosy place in the trees - very unique experience. Fire place to have a BBQ - cold shower outside, birds singing in the morning... Definitely recommended if you are up to experience something and don't want to have it "normal". Looking forward to coming back.
          Lubos`,
          rate: 4,
          by: {
            _id: 'u899',
            fullname: 'Lars',
            imgUrl:
              'https://res.cloudinary.com/dymtestxz/image/upload/v1626393518/sprint4/spaces/1%20-%20OAKTREEHOUSE%20-%20SLEEP%20IN%20THE%20TREEHOUSE/reviewers/abe04ca8-1483-4a60-9e0c-dd38dd6268f9_de94ln.webp',
          },
        },
      ],
      likedByUserIds: ['u101', 'u102', 'u103'],
    });

    // ==========================================================================
    // 2 ===========================================================================

    spaces.push({
      _id: 's' + utilService.makeId(),
      name: 'Chalet Eigernordwand',
      imgUrls: [
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626394084/sprint4/spaces/2-%20Chalet%20Eigernordwand/space/b5a5444a-91ab-43cf-abf1-79832793a56d_dcvqpm.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626394082/sprint4/spaces/2-%20Chalet%20Eigernordwand/space/a91d2c6f-e5b2-4e96-90f2-e0579d69038a_bviirx.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626394082/sprint4/spaces/2-%20Chalet%20Eigernordwand/space/77cdae47-7827-4fa6-9b8d-5b9dfcbe15ef_i3ycet.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626394082/sprint4/spaces/2-%20Chalet%20Eigernordwand/space/7f273de4-b8eb-4242-8df4-3355c6df7223_crtfad.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626394082/sprint4/spaces/2-%20Chalet%20Eigernordwand/space/7e7fca56-6af0-491a-95ba-fa92e96a9a0c_o5ux7j.webp',
      ],
      price: 153,
      description: `3.5-room apartment in a beautiful, quiet location in Grindelwald with 2 double bedrooms and spacious bathroom with bath and shower. The heart of the apartment is the open kitchen as well as the cozy, bright living and dining area. The kitchen is fully equipped with a kettle, coffee maker, toaster, microwave and dishwasher. There is a hairdryer in the bathroom. Balcony with a beautiful view of the Eiger north wall.

        Guest access
        Parking and ski storage are available.`,
      capacity: 5,
      amenities: [
        'TV',
        'wifi',
        'bath',
        'kitchen',
        'free parking',
        'washing machine',
        'smoke alarm',
        'lockbox',
        'air conditioning',
        'security cameras',
      ],
      host: {
        _id: 'u101',
        fullname: 'Hermann',
        imgUrl:
          'https://res.cloudinary.com/dymtestxz/image/upload/v1626394080/sprint4/spaces/2-%20Chalet%20Eigernordwand/host/235e5738-74a3-4390-a564-72d5a9417a92_jmn7hw.webp',
      },
      loc: {
        country: 'Switzerland',
        countryCode: 'IL',
        address: 'Grindelwald, Bern',
        lat: 46.62433,
        lng: 8.03403,
      },
      reviews: [
        {
          _id: 'r101',
          txt:
            'Brilliant place. Modern, new, easy to park, 5 minute drive to center, fully equipped.',
          rate: {
            cleanliness: 2,
            checkin: 3,
            communication: 3,
            accuracy: 1,
            value: 5,
            location: 3,
          },
          by: {
            _id: 'u891',
            fullname: 'Lior',
            imgUrl:
              'https://res.cloudinary.com/dymtestxz/image/upload/v1626394080/sprint4/spaces/2-%20Chalet%20Eigernordwand/reviewers/79217452-8f8a-4786-8dfb-290eb2578bde_f2kw67.webp',
          },
        },
        {
          _id: 'r102',
          txt: `Matches the name perfectly - located right in front of the Eiger-Nordwand, the apartment offers an astonishing view of the mountains. While Grindelwald center is just a short walk away, the location is perfect for hiking in the region. The interior is extremely comfy and provides everything one would need during a weeks worth of vacation. All-in-all a really pleasant experience, a huge thanks for that!`,
          rate: 4,
          by: {
            _id: 'u892',
            fullname: 'Fabio',
            imgUrl:
              'https://res.cloudinary.com/dymtestxz/image/upload/v1626394081/sprint4/spaces/2-%20Chalet%20Eigernordwand/reviewers/f3d5d005-6a58-4cd8-9321-0bcdac9c8d18_w86wvs.webp',
          },
        },
        {
          _id: 'r103',
          txt: `Great location with the Eiger mountain as your backyard view and front view of Grindelwald. Easy walk to Männlichenbahn. Place was clean, modern, and plenty of space for our two young kids. Hermann was generous to provide an adapter after I found out I brought the wrong one.`,
          rate: 4,
          by: {
            _id: 'u893',
            fullname: 'Dennis',
            imgUrl:
              'https://res.cloudinary.com/dymtestxz/image/upload/v1626394081/sprint4/spaces/2-%20Chalet%20Eigernordwand/reviewers/8fc8cbeb-e888-4d19-9825-3fab7d72cac3_bl6rdb.jpg',
          },
        },
        {
          _id: 'r104',
          txt: `This was a terrific stay. It's a lovely place with beautiful views. It's also well located, outside of the village but walking distance. I started many hikes during my stay right from the chalet. When I arrived I walked with my luggage from the Terminal train station though it is an uphill climb. I mostly walked into the village and to the grocery store as the bus only comes once an hour and, well, the walk is simply stunning even in the rain. Bring your own umbrella if you feel you need one as there isn't one at the chalet. The place is well equipped otherwise. Hermann was also very responsive to messages I sent him through the website.`,
          rate: 4,
          by: {
            _id: 'u894',
            fullname: 'Sandeep',
            imgUrl:
              'https://res.cloudinary.com/dymtestxz/image/upload/v1626394080/sprint4/spaces/2-%20Chalet%20Eigernordwand/reviewers/50b4247d-f7b3-4b66-aed7-095a082ce1fd_dxf6ew.webp',
          },
        },
        {
          _id: 'r105',
          txt: `Amazing views, ultra comfortable chalet and sparkling clean! Will stay again. Great spot to access all of Grindelwald.`,
          rate: 4,
          by: {
            _id: 'u895',
            fullname: 'Christina And Tim',
            imgUrl:
              'https://res.cloudinary.com/dymtestxz/image/upload/v1626394080/sprint4/spaces/2-%20Chalet%20Eigernordwand/reviewers/2062bf92-cd9a-46de-a851-8fb36ebf0273_j2i1gz.webp',
          },
        },
        {
          _id: 'r106',
          txt: `Hermann’s place was better than what we expected. He provided us with everything we needed, including a high chair and a baby bed for our daughter. He was very helpful and super responsive during our stay. The view from the chalet is stunning, on both sides. We came by car but there was a bus stop just next to the chalet, so it’s easy accessible for people coming by train/bus.
          Thanks again Hermann, we’ll be back!`,
          rate: 4,
          by: {
            _id: 'u896',
            fullname: 'Julian',
            imgUrl:
              'https://res.cloudinary.com/dymtestxz/image/upload/v1626394081/sprint4/spaces/2-%20Chalet%20Eigernordwand/reviewers/original_w10jf3.webp',
          },
        },
        {
          _id: 'r107',
          txt: `The vast space and the cleanliness of this home are second to none. The views were splendid. We appreciate the modern amenities. Indeed it is easier if you have a car as it is located about 10 mins or so from the centre however bus no. 123 runs hourly. Easy self check in & out, keep in view if you have many luggages, staircases on the side. Its winter, the large suitcases we had gave us quite a workout! Our experience: so much better than staying in a hotel!
          `,
          rate: 4,
          by: {
            _id: 'u897',
            fullname: 'Angelina',
            imgUrl:
              'https://res.cloudinary.com/dymtestxz/image/upload/v1626394081/sprint4/spaces/2-%20Chalet%20Eigernordwand/reviewers/d9f57e5b-e392-4c8a-aa17-2d200a3526f1_ovvhox.webp',
          },
        },
        {
          _id: 'r108',
          txt: `We had a wonderful stay in Hermann’s place. It is very modern and new. The living area is very spacious and open with Eiger views. The 2 bedrooms and bathrooms are very comfortable and nice windows looking out. Hiking trails start right from your door and the views are incredible!!`,
          rate: 4,
          by: {
            _id: 'u898',
            fullname: 'Emma',
            imgUrl:
              'https://res.cloudinary.com/dymtestxz/image/upload/v1626394080/sprint4/spaces/2-%20Chalet%20Eigernordwand/reviewers/9f75bd0c-d7f9-42a8-ba13-5c6201bd0b5c_nvihbm.webp',
          },
        },
      ],
      likedByUserIds: ['u101', 'u102', 'u103'],

      // ==========================================================================
      // 3 ===========================================================================
    });
    spaces.push({
      _id: 's' + utilService.makeId(),
      name: "Still Life St Paul's Executive",
      type: 'home',
      imgUrls: [
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626394616/sprint4/spaces/3%20-%20Still%20Life%20St%20Paul%27s%20Executive/space/0a6eeebb-4c3e-4e6c-9bff-414012c215f4_hhgtvb.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626394612/sprint4/spaces/3%20-%20Still%20Life%20St%20Paul%27s%20Executive/space/46ef9170-4b3d-42d4-b4e0-d7e7087c445e_jlonoa.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626394617/sprint4/spaces/3%20-%20Still%20Life%20St%20Paul%27s%20Executive/space/91a8e796-2828-4412-847d-38ea1cdc2890_lo1c1l.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626394613/sprint4/spaces/3%20-%20Still%20Life%20St%20Paul%27s%20Executive/space/2e707f27-6214-4c56-b9de-751a25c2cfa8_v23goc.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626394612/sprint4/spaces/3%20-%20Still%20Life%20St%20Paul%27s%20Executive/space/7a7142c4-1e7c-4146-8d72-1efd04d872a9_lsxarl.webp',
      ],
      price: 118,
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries',
      capacity: 4,
      amenities: [
        'TV',
        'wifi',
        'bath',
        'kitchen',
        'free parking',
        'washing machine',
        'smoke alarm',
        'lockbox',
        'air conditioning',
        'security cameras',
      ],
      host: {
        _id: 'u101',
        fullname: 'Mar',
        imgUrl:
          'https://res.cloudinary.com/dymtestxz/image/upload/v1626394612/sprint4/spaces/3%20-%20Still%20Life%20St%20Paul%27s%20Executive/host/e456810a-e172-4a26-997a-53dfbbb08951_hj4oh9.webp',
      },
      loc: {
        country: 'United Kingdom',
        countryCode: 'GB',
        address: 'London, England',
        lat: 51.5033331,
        lng: -0.0793664,
      },
      reviews: [
        {
          _id: 'r102',
          txt: 'sdvmlvs adklmalkm wfbhlwekjfn aejfnhkjs.',
          rate: {
            cleanliness: 2,
            checkin: 3,
            communication: 3,
            accuracy: 1,
            value: 5,
            location: 3,
          },
          by: {
            _id: 'u894',
            fullname: 'kslmv sojks',
            imgUrl:
              'https://res.cloudinary.com/dymtestxz/image/upload/v1626394613/sprint4/spaces/3%20-%20Still%20Life%20St%20Paul%27s%20Executive/reviewers/photo-1531427186611-ecfd6d936c79_lexlem.webp',
          },
        },
      ],
      likedByUserIds: ['u101', 'u102', 'u103'],
    });

    // ==========================================================================
    // 4 ===========================================================================

    spaces.push({
      _id: 's' + utilService.makeId(),
      name: 'Superbe chalet Hautes Vosges en pleine nature',
      imgUrls: [
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626394826/sprint4/spaces/4%20-%20Superbe%20chalet%20Hautes%20Vosges%20en%20pleine%20nature/space/3a8f8bf5-a0c4-4b9d-bb27-fff31d00e9b4_norbuq.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626394822/sprint4/spaces/4%20-%20Superbe%20chalet%20Hautes%20Vosges%20en%20pleine%20nature/space/45b9ddd1-b259-40b9-a81d-dfef8258f9b9_bklwas.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626394822/sprint4/spaces/4%20-%20Superbe%20chalet%20Hautes%20Vosges%20en%20pleine%20nature/space/fb848313-297b-4b64-8685-0bcd11e3e5ab_feuxmm.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626394822/sprint4/spaces/4%20-%20Superbe%20chalet%20Hautes%20Vosges%20en%20pleine%20nature/space/23464bb6-5525-4a91-901f-a50b758bd6c2_u8jomu.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626394822/sprint4/spaces/4%20-%20Superbe%20chalet%20Hautes%20Vosges%20en%20pleine%20nature/space/b1b9395b-d418-407a-bf24-541fd2e4af77_rmxowk.webp',
      ],
      price: 65,
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries',
      capacity: 5,
      amenities: [
        'TV',
        'wifi',
        'bath',
        'kitchen',
        'free parking',
        'washing machine',
        'smoke alarm',
        'lockbox',
        'air conditioning',
        'security cameras',
      ],
      host: {
        _id: 'u101',
        fullname: 'Philippe',
        imgUrl:
          'https://res.cloudinary.com/dymtestxz/image/upload/v1626394822/sprint4/spaces/4%20-%20Superbe%20chalet%20Hautes%20Vosges%20en%20pleine%20nature/host/2062bf2d-8710-4204-9cc8-7ac24242a14c_m8ly6d.webp',
      },
      loc: {
        country: 'France',
        countryCode: 'IL',
        address: 'Fresse sur Moselle, Grand Est',
        lat: 47.87556,
        lng: 6.78865,
      },
      reviews: [
        {
          _id: 'r102',
          txt: 'sdvmlvs adklmalkm wfbhlwekjfn aejfnhkjs.',
          rate: 4,
          by: {
            _id: 'u894',
            fullname: 'kslmv sojks',
            imgUrl:
              'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
          },
        },
      ],
      likedByUserIds: ['u101', 'u102', 'u103'],
    });

    // ==========================================================================
    // 5 ===========================================================================

    spaces.push({
      _id: 's' + utilService.makeId(),
      name: 'Dizengof area - Superb 1BR Balcony on the square',
      imgUrls: [
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626395126/sprint4/spaces/5%20-%20Dizengof%20area%20-%20Superb%201BR%20Balcony%20on%20the%20square/space/905bcbe9-a7d9-446f-8f25-e29c0d454d86_nop6j9.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626395126/sprint4/spaces/5%20-%20Dizengof%20area%20-%20Superb%201BR%20Balcony%20on%20the%20square/space/030089eb-0419-417e-8784-eb9c912e7f51_b9e9ji.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626395126/sprint4/spaces/5%20-%20Dizengof%20area%20-%20Superb%201BR%20Balcony%20on%20the%20square/space/c1b98710-577a-4f7a-a2a0-ab4ea4a3b72a_xgtxwl.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626395126/sprint4/spaces/5%20-%20Dizengof%20area%20-%20Superb%201BR%20Balcony%20on%20the%20square/space/33657269-f87b-4e61-be86-db3dd3fe11e7_d98pgw.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626395126/sprint4/spaces/5%20-%20Dizengof%20area%20-%20Superb%201BR%20Balcony%20on%20the%20square/space/adf2e011-1ca4-4eff-abda-fefddbbbb39f_ydt84q.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626395126/sprint4/spaces/5%20-%20Dizengof%20area%20-%20Superb%201BR%20Balcony%20on%20the%20square/space/5f54bfab-4ce9-4c98-bedd-f25710755c25_fweptc.webp',
      ],
      price: 128,
      description: `The space
        Located in a prime location at the intersection of Ben Yehouda and Bograshov.
        You will find everything you need right by the apartment. A few minutes walk to the beach, restaurants, bakeries, bars etc..
        There is a living room, two bedrooms, a fully equipped kitchen, a bathroom, and a balcony. 
        The bedrooms are equipped with a comfortable double bed and a large wardrobe.
         The bathroom has a shower and a toilet.
        In the living room you have a nice sitting area with TV including international channels, a high-speed internet connection.
        The sofa bed can accommodate 2 additional travelers.
        In the kitchen, there are all the needed appliances to accommodate your stay. ​ 
        Your comfort is important to us; we make sure our apartments are equipped with all the necessary appliances you will need while you are away, so we provide: coffee, cleaning supplies, home appliances and cooking utensils and an iron. ​
        Fresh, clean sheets and towels are of course provided.
        Perfect for family and friends.The apartment can accommodate up to 6 people.
        We are happy to assist you with further services as needed. ​
        Guest access
        Check-in process is automatic (Check-in instructions will be sent prior to arrival).
        We are available for any questions or assistance during the stay.
        Other things to note
        - After each check-out, a team of professional cleaners, clean our apartments for the comfort of our guests.
        
        - Please note that if the apartment is returned in a very dirty condition, you will be overcharged.
        
        - A deposit has to be paid before the check in .
        
        - It is also imperative to return the exact number of towels and bedsheets on the day of check out, each unreturned item will be charged 40 ILS.
        
        - None of our apartments can be rented by groups of minors, in order to confirm the identity of our guest, we ask before each check in the picture of passports.
        
        - !!!!!It is strictly forbidden to organize parties and make noise after 10 p.m.`,
      capacity: 5,
      amenities: [
        'TV',
        'wifi',
        'bath',
        'kitchen',
        'free parking',
        'washing machine',
        'smoke alarm',
        'lockbox',
        'air conditioning',
        'security cameras',
      ],
      host: {
        _id: 'u101',
        fullname: 'Benjamin',
        imgUrl:
          'https://res.cloudinary.com/dymtestxz/image/upload/v1626395126/sprint4/spaces/5%20-%20Dizengof%20area%20-%20Superb%201BR%20Balcony%20on%20the%20square/host/faea6454-bfb0-4176-9fc8-734502dba969_ntmocl.webp',
      },
      loc: {
        country: 'Israel',
        countryCode: 'IL',
        address: 'Tel Aviv, Israel',
        lat: 32.072407,
        lng: 34.782362,
      },
      reviews: [
        {
          _id: 'r102',
          txt: 'sdvmlvs adklmalkm wfbhlwekjfn aejfnhkjs.',
          rate: 4,
          by: {
            _id: 'u894',
            fullname: 'kslmv sojks',
            imgUrl:
              'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
          },
        },
      ],
      likedByUserIds: ['u101', 'u102', 'u103'],
    });

    // ==========================================================================
    // 6  ===========================================================================

    spaces.push({
      _id: 's' + utilService.makeId(),
      name: 'Snug Holiday Home in Thale with Netflix, Garden, Terrace',
      imgUrls: [
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626395458/sprint4/spaces/6%20-%20Snug%20Holiday%20Home%20in%20Thale%20with%20Netflix%2C%20Garden%2C%20Terrace/space/3017154f-d54b-4bfd-bc01-eb8184bc9732_nlqrar.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626395454/sprint4/spaces/6%20-%20Snug%20Holiday%20Home%20in%20Thale%20with%20Netflix%2C%20Garden%2C%20Terrace/space/7f1c5c59-f717-462e-8116-a04faaad5094_t69owr.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626395454/sprint4/spaces/6%20-%20Snug%20Holiday%20Home%20in%20Thale%20with%20Netflix%2C%20Garden%2C%20Terrace/space/11cf3107-77d5-4dc8-b6e5-fed5ff0d6811_ruwu4h.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626395453/sprint4/spaces/6%20-%20Snug%20Holiday%20Home%20in%20Thale%20with%20Netflix%2C%20Garden%2C%20Terrace/space/b030cd7e-1e18-405b-af10-6f5295e1efd4_nr2mrk.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626395457/sprint4/spaces/6%20-%20Snug%20Holiday%20Home%20in%20Thale%20with%20Netflix%2C%20Garden%2C%20Terrace/space/97a83afb-720b-4d46-9d68-777753731e0e_njpuun.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626395458/sprint4/spaces/6%20-%20Snug%20Holiday%20Home%20in%20Thale%20with%20Netflix%2C%20Garden%2C%20Terrace/space/5f7ae8bf-109e-43c7-b421-ec019523dc01_ueacov.webp',
      ],
      price: 219,
      description: `This exclusive holiday home is situated within a nature reserve on a 500-metre high plateau in Altenbrak, a district of Thale. You will be staying at a tastefully and individually furnished house in a quiet, rural location. The interior, open floor plan and use of light woods meets the highest demands when it comes to quality, shape and colour. The upscale furnishings as well as the design provide maximum comfort and cosiness. This panoramic chalet offers everything you could wish for: fast WiFi, a state of the art smart TV and much more. Large windows and a balcony that runs around the facade offer panoramic vistas of the adjacent meadows and hilly forests. Enjoy the romantic ambiance by the crackling fireplace - especially after dark. The terrace and garden are ideal for sunbathing and barbecuing. Here in these exclusive surroundings, your daily stress will melt way on the first day of your stay. Another highlight of this holiday home: there are no street lights nearby. This guarantees a fantastic view of the surroundings from the plateau, even at night. And you shouldn't miss out on the extraordinary experience of watching the animals that tend to roam the beautiful landscape below the plateau. All this creates a very special, unforgettable flair you most likely won't find anywhere else. The hilly landscape of the north-eastern Harz region makes one want to go hiking or take walks. A well-marked network of hiking trails leads through the idyllic Bodetal and to the plateaus Hexentanzplatz and Rosstrappe. Cyclists will also get their money's worth enjoying tours on various routes or downhill slopes. Recommended excursions into the region: Seilbahnen Thale Erlebniswelt (amusement park), Rappbode Dam, Rübeländer Caves, Pullman City Harz, Brocken mountain, Quedlinburg.


        Layout: Ground floor: (Entrance, hall, open kitchen(electric kettle, toaster, cooker(ceramic), coffee machine(filter), oven, microwave, dishwasher, fridge-freezer), Living/diningroom(seating area), bedroom(double bed(160 x 200 cm), TV(satellite, smart TV)), bathroom(shower, washbasin, toilet))
        
        On the 1st floor: (Living room(TV(satellite, smart TV), stove(wood)), bedroom(double bed(180 x 200 cm), TV(satellite, smart TV)), Gallery bedroom(double bed(140 x 200 cm)), bathroom(bath tub, shower, washbasin, toilet), Landing)
        
        storage, Netflix, radio, stereo unit, balcony, heating(central, floor heating), terrace(private, roofed, 30 m2), garden(private, 500 m2), garden furniture, BBQ(charcoal), parking, deckchairs, hairdryer`,
      capacity: 5,
      amenities: [
        'TV',
        'wifi',
        'bath',
        'kitchen',
        'free parking',
        'washing machine',
        'smoke alarm',
        'lockbox',
        'air conditioning',
        'security cameras',
      ],
      host: {
        _id: 'u101',
        fullname: 'Karen - BELVILLA',
        imgUrl:
          'https://res.cloudinary.com/dymtestxz/image/upload/v1626395450/sprint4/spaces/6%20-%20Snug%20Holiday%20Home%20in%20Thale%20with%20Netflix%2C%20Garden%2C%20Terrace/host/42e39ba5-0cd4-4e3d-a734-c2b3226b1701_c6ppv9.webp',
      },
      loc: {
        country: 'Germany',
        countryCode: 'IL',
        address: 'Thale, Sachsen-Anhalt',
        lat: 51.75565,
        lng: 11.04563,
      },
      reviews: [
        {
          _id: 'r102',
          txt: 'sdvmlvs adklmalkm wfbhlwekjfn aejfnhkjs.',
          rate: 4,
          by: {
            _id: 'u894',
            fullname: 'kslmv sojks',
            imgUrl:
              'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
          },
        },
      ],
      likedByUserIds: ['u101', 'u102', 'u103'],
    });

    // ==========================================================================
    // 7  ===========================================================================

    spaces.push({
      _id: 's' + utilService.makeId(),
      name: `Charming water-front cottage on Martha's Vineyard!`,
      imgUrls: [
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626395783/sprint4/spaces/7%20-%20Charming%20water-front%20cottage%20on%20Martha%27s%20Vineyard%21/space/56e5d85c-1752-48f1-83a8-1ca347e93474_lwhmmx.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626395790/sprint4/spaces/7%20-%20Charming%20water-front%20cottage%20on%20Martha%27s%20Vineyard%21/space/fa4a5619-c80e-4495-bdbb-3aeac1435017_ndti8u.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626395784/sprint4/spaces/7%20-%20Charming%20water-front%20cottage%20on%20Martha%27s%20Vineyard%21/space/efe0d953-692a-4d40-8e78-e7062d6a81e2_tyn4yf.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626395784/sprint4/spaces/7%20-%20Charming%20water-front%20cottage%20on%20Martha%27s%20Vineyard%21/space/4e770f87-496e-43a5-95c1-00e0e8a5cb72_ycjgtx.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626395782/sprint4/spaces/7%20-%20Charming%20water-front%20cottage%20on%20Martha%27s%20Vineyard%21/space/51a93acb-dd8d-4395-b523-806e8cee663a_msa0ij.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626395783/sprint4/spaces/7%20-%20Charming%20water-front%20cottage%20on%20Martha%27s%20Vineyard%21/space/c34086ff-712c-430c-9e1a-3ae915d8f406_jsmta6.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626395782/sprint4/spaces/7%20-%20Charming%20water-front%20cottage%20on%20Martha%27s%20Vineyard%21/space/4c4ba749-fa63-45e6-9759-8c3847e1218b_y4ykhc.webp',
      ],
      price: 410,
      description: `Quiet, charming cottage right on the beach with gorgeous sunsets! Perfect for a relaxing stay on Martha's Vineyard during any time of the year. Tell us about your vacation plans so we can help you enjoy our little piece of paradise.
        The space
        - 1 bedroom, 1 bath; and outdoor shower
        - Perfect couples retreat
        - Right on the beach with a beautiful view of Lagoon Pond
        - Full kitchen
        - Wifi and cable TV available
        - Towels / linens are provided
        - Washer & dryer available
        - Parking available at cottage
        - Dogs (on leashes) only; no other pets. No pit bull/mixes, Dobermans, Rottweilers or other guard/attack dog breeds; insurance will not cover.
        - No smoking inside the cottage
        Guest access
        Fire pit area is accessible to cottage guests. Outdoor games are available in the garage.`,
      capacity: 5,
      amenities: [
        'TV',
        'wifi',
        'bath',
        'kitchen',
        'free parking',
        'washing machine',
        'smoke alarm',
        'lockbox',
        'air conditioning',
        'security cameras',
      ],
      host: {
        _id: 'u101',
        fullname: 'Anne',
        imgUrl:
          'https://res.cloudinary.com/dymtestxz/image/upload/v1626395782/sprint4/spaces/7%20-%20Charming%20water-front%20cottage%20on%20Martha%27s%20Vineyard%21/host/d049a05d-0e95-4fb0-bdc2-07781e0f9090_uy4o8p.webp',
      },
      loc: {
        country: 'United States',
        countryCode: 'US',
        address: 'Oak Bluffs, Massachusetts',
        lat: 41.45555,
        lng: -70.56782,
      },
      reviews: [
        {
          _id: 'r102',
          txt: 'sdvmlvs adklmalkm wfbhlwekjfn aejfnhkjs.',
          rate: 4,
          by: {
            _id: 'u894',
            fullname: 'kslmv sojks',
            imgUrl:
              'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
          },
        },
      ],
      likedByUserIds: ['u101', 'u102', 'u103'],
    });

    // ==========================================================================
    // 8 ===========================================================================

    spaces.push({
      _id: 's' + utilService.makeId(),
      name: `Star Infinity Suite with Private heated Jacuzzi`,
      imgUrls: [
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626396262/sprint4/spaces/8%20-%20Star%20Infinity%20Suite%20with%20Private%20heated%20Jacuzzi/space/ab3db832-d6a8-4d12-a77d-a52e2c73131e_svs15r.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626396261/sprint4/spaces/8%20-%20Star%20Infinity%20Suite%20with%20Private%20heated%20Jacuzzi/space/b9965d06-a067-486e-be34-7a5f7e172e13_rqpypv.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626396262/sprint4/spaces/8%20-%20Star%20Infinity%20Suite%20with%20Private%20heated%20Jacuzzi/space/e7eda621-bf90-4477-8c95-36f9a8f85376_qwkv75.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626396262/sprint4/spaces/8%20-%20Star%20Infinity%20Suite%20with%20Private%20heated%20Jacuzzi/space/eb60dcc2-a14f-4022-b2db-3d0e71c32a62_ihb6iq.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626396264/sprint4/spaces/8%20-%20Star%20Infinity%20Suite%20with%20Private%20heated%20Jacuzzi/space/f3529386-7fef-464d-9735-726fcb8fe6ec_zn6t6o.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626396260/sprint4/spaces/8%20-%20Star%20Infinity%20Suite%20with%20Private%20heated%20Jacuzzi/space/8de5527e-0a73-40d3-a4bf-e0989da9d9be_lat91e.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626396261/sprint4/spaces/8%20-%20Star%20Infinity%20Suite%20with%20Private%20heated%20Jacuzzi/space/a901f447-a63a-4c1d-9476-99c8602e600e_l7b1fj.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626396261/sprint4/spaces/8%20-%20Star%20Infinity%20Suite%20with%20Private%20heated%20Jacuzzi/space/b17aa1d6-0de7-4690-9fc1-61cc778bade9_nc1v5u.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626396260/sprint4/spaces/8%20-%20Star%20Infinity%20Suite%20with%20Private%20heated%20Jacuzzi/space/10e6eff0-a766-4f1b-afbd-f11f9a9bad6e_wgx6im.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626396257/sprint4/spaces/8%20-%20Star%20Infinity%20Suite%20with%20Private%20heated%20Jacuzzi/space/4c40bdc8-ec30-41c5-ad8b-24ba26db9651_dxp3fb.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626396261/sprint4/spaces/8%20-%20Star%20Infinity%20Suite%20with%20Private%20heated%20Jacuzzi/space/893fe5b5-71ad-4e60-b3da-7ff7ccde2d02_dzkksa.webp',
      ],
      price: 354,
      description:
        `The Star Infinity Suites is brand new complex of 3 suites each one with private heated jacuzzi and one shared swimming pool. An exclusive location provides a marvelous seashore&mountain landscape.
        The complex is constructed in an excuisite Cycladic style and covered with a minimalistic luxury. Natural stone and organic elements create a nobel cosiness. All the furniture and decor is made in authentic Greek style with exclusive and unique elements.
        The space
        The complex of 3 suites is located in Pyrgos, the highest Santorini village. An exclusive location provides a marvelous seashore&mountain landscape.
        The complex is constructed in an excuisite Cycladic style and covered with a minimalistic luxury. It surprises and inspires the lovers of genuine beauty. Natural stone and organic elements create a nobel cosiness.
        All the suites are equipped with an outdoor heated Jacuzzi and a cosy terrace. What is more, there is an shared swimming pool with a sea view on the territory.
        Each suite has its own kitchen and a lounge zone. The second floor includes bedroom with a with queen double bed and bathroom with shower. All the furniture and decor is made in authentic Greek style with exclusive and unique elements.
        License number
        00001113638`,
      capacity: 5,
      amenities: [
        'TV',
        'wifi',
        'bath',
        'kitchen',
        'free parking',
        'washing machine',
        'smoke alarm',
        'lockbox',
        'air conditioning',
        'security cameras',
      ],
      host: {
        _id: 'u101',
        fullname: 'Theodoris',
        imgUrl:
          'https://res.cloudinary.com/dymtestxz/image/upload/v1626396260/sprint4/spaces/8%20-%20Star%20Infinity%20Suite%20with%20Private%20heated%20Jacuzzi/host/f31e7486-185f-444c-bdcd-2f7ea7b885a8_v5fhys.webp',
      },
      loc: {
        country: 'Greece',
        countryCode: 'IL',
        address: 'Pyrgos Kallistis, Greece',
        lat: 36.383240,
        lng: 25.448610,
      },
      reviews: [
        {
          _id: 'r102',
          txt: 'sdvmlvs adklmalkm wfbhlwekjfn aejfnhkjs.',
          rate: 4,
          by: {
            _id: 'u894',
            fullname: 'kslmv sojks',
            imgUrl:
              'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
          },
        },
      ],
      likedByUserIds: ['u101', 'u102', 'u103'],
    });

    // ==========================================================================
    // 9 ===========================================================================

    spaces.push({
      _id: 's' + utilService.makeId(),
      name: 'Manor cottage',
      imgUrls: [
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626396867/sprint4/spaces/9%20-%20Manor%20cottage/space/3da2f22e-21bd-4592-b366-1f6020662174_gpkhqc.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626396867/sprint4/spaces/9%20-%20Manor%20cottage/space/7b854802-33d3-4a8a-891a-e94f3f90fcf5_qigymp.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626396867/sprint4/spaces/9%20-%20Manor%20cottage/space/7453f54a-8889-43f1-8fdd-757cef05047e_rrxvnc.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626396868/sprint4/spaces/9%20-%20Manor%20cottage/space/ebebe924-f9da-4e84-8fab-404c5d3ae8f6_thwn9r.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626396864/sprint4/spaces/9%20-%20Manor%20cottage/space/2cbdb29d-d8e4-4edf-9f64-daf59baa5040_jyeowy.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626396868/sprint4/spaces/9%20-%20Manor%20cottage/space/b5951ad7-6a43-4f39-90f9-0722ee5c540b_sqxziz.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626396864/sprint4/spaces/9%20-%20Manor%20cottage/space/1d48db99-3d2c-47ca-b4d7-86aac9325695_acmtxo.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626396876/sprint4/spaces/9%20-%20Manor%20cottage/space/9e99b6d3-c779-4efc-986f-d6e119548dea_bmmotu.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626396880/sprint4/spaces/9%20-%20Manor%20cottage/space/9ae04513-0db9-4c94-a554-cc159fcb1394_hnt0xj.webp',
      ],
      price: 311,
      description:
        `A beautiful cottage set in the grounds of a 17th Century Manor house with beautiful views over the surrounding countryside. The extensive grounds back onto the River Avon and include a Tennis/Basketball court and children's play area. The cottage has two bedrooms, one with a super king size bed and the other a double bed- and there is space for mattresses on the floor if required. There is a separate living area with pool table; a full kitchen and laundry; a bathroom and a separate toilet.
        The space
        The Cottage is the converted stables in the grounds of a country Manor House. The property sits on top of a hill with beautiful views across the countryside. Guests can enjoy outdoor activities such as tennis on the court; croquet on the expansive lawns; paddleboarding via direct river access; or venture out for cycling. The village is beautiful and there are many more to explore in walking distance with lots of pubs. Broadway in the Cotswolds is 15m by car
        Guest access
        Guests are free to use all the grounds, tennis courts and play areas. We will be in the Manor House so our children may still be jumping on the trampoline from time to time! The outside sofa area next to the cottage with barbecue and gazebo is yours exclusively for the duration of your stay. The river is easy to access by slipway. Paddleboards are available to hire (at extra charge).
        Other things to note
        The master bedroom is very large with a super Kingsize bed- there is more than enough space for a few mattresses on the floor for children if required- just ask if required. We have a travel cot and high chair for littler ones too. The kitchen has fridge/freezer; oven; dishwasher and washing machine for all your needs.`,
      capacity: 5,
      amenities: [
        'TV',
        'wifi',
        'bath',
        'kitchen',
        'free parking',
        'washing machine',
        'smoke alarm',
        'lockbox',
        'air conditioning',
        'security cameras',
      ],
      host: {
        _id: 'u101',
        fullname: 'Robert & Sarah',
        imgUrl:
          'https://res.cloudinary.com/dymtestxz/image/upload/v1626396864/sprint4/spaces/9%20-%20Manor%20cottage/host/1c9600f5-e6f3-4daa-a4cb-bb4652dfcc01_cj2lp7.webp',
      },
      loc: {
        country: 'United Kingdom',
        countryCode: 'UK',
        address: 'Cropthorne, England',
        lat: 52.101740,
        lng: -2.004930,
      },
      reviews: [
        {
          _id: 'r102',
          txt: 'sdvmlvs adklmalkm wfbhlwekjfn aejfnhkjs.',
          rate: 4,
          by: {
            _id: 'u894',
            fullname: 'kslmv sojks',
            imgUrl:
              'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
          },
        },
      ],
      likedByUserIds: ['u101', 'u102', 'u103'],
    });

    // ==========================================================================
    // 10 ===========================================================================

    spaces.push({
      _id: 's' + utilService.makeId(),
      name: 'Brand new gorgeous 2 bedroom guest house',
      imgUrls: [
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626397282/sprint4/spaces/10%20-%20Brand%20new%20gorgeous%202%20bedroom%20guest%20house/space/af6cff2e-072b-44db-baef-913ae5beb5f2_bgh1py.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626397282/sprint4/spaces/10%20-%20Brand%20new%20gorgeous%202%20bedroom%20guest%20house/space/cd87eeb8-cd81-4866-81c6-694cdc0dd0bc_zpke0q.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626397278/sprint4/spaces/10%20-%20Brand%20new%20gorgeous%202%20bedroom%20guest%20house/space/6cf00c35-ef50-4581-9a8d-2430cebc8c88_vnu0wb.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626397278/sprint4/spaces/10%20-%20Brand%20new%20gorgeous%202%20bedroom%20guest%20house/space/4343a305-d383-4cf6-b68a-35abd44e1302_yyibgm.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626397278/sprint4/spaces/10%20-%20Brand%20new%20gorgeous%202%20bedroom%20guest%20house/space/3234b75b-1283-41b1-adde-d06473c9e128_fay9fw.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626397278/sprint4/spaces/10%20-%20Brand%20new%20gorgeous%202%20bedroom%20guest%20house/space/8ba2e578-ff6c-4fbf-bb85-168c07f9c16b_l211vy.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626397278/sprint4/spaces/10%20-%20Brand%20new%20gorgeous%202%20bedroom%20guest%20house/space/37856dfb-0101-4ca7-8e9b-7fd50bf6275e_o2unsf.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626397282/sprint4/spaces/10%20-%20Brand%20new%20gorgeous%202%20bedroom%20guest%20house/space/f18cd422-11ed-485f-b44e-256a2ca521a9_gexinp.webp',
      ],
      price: 350,
      description:
        `This is a gorgeous brand new 2 bedroom guest house on the bike path that leads to downtown Edgartown and both State Beach and South Beach, as well as 1/4 of a mile from the famous Morning Glory Farm Stand. There are cathedral ceilings in the living room, which provide a open, spacious feel. There is a large deck on the front of the house with a grill, table and chairs. Part of it is covered in shade. Separate parking for guests with privacy, as it sits 200+ feet from the main house.
        The space
        The open floor plan in the living room and kitchen, along with the cathedral ceiling make it feel very spacious. The deck includes a grill, as well as ample outside seating. We abut 18 acres of conservation land in the back of the house.
        Extra amenities: hair dryer; dishwasher; washer; dryer; iron; ironing board; vacuum
        Guest access
        The whole house is yours and separate from the primary residence, as well as the deck and surrounding yard.`,
      capacity: 5,
      amenities: [
        'TV',
        'wifi',
        'bath',
        'kitchen',
        'free parking',
        'washing machine',
        'smoke alarm',
        'lockbox',
        'air conditioning',
        'security cameras',
      ],
      host: {
        _id: 'u101',
        fullname: 'Debra',
        imgUrl:
          'https://res.cloudinary.com/dymtestxz/image/upload/v1626397278/sprint4/spaces/10%20-%20Brand%20new%20gorgeous%202%20bedroom%20guest%20house/host/8cca96ba-214d-4b49-9ef0-597731b27da3_otb2vl.webp',
      },
      loc: {
        country: 'United States',
        countryCode: 'US',
        address: 'Edgartown, Massachusetts',
        lat: 41.391380,
        lng: -70.519600,
      },
      reviews: [
        {
          _id: 'r102',
          txt: 'sdvmlvs adklmalkm wfbhlwekjfn aejfnhkjs.',
          rate: 4,
          by: {
            _id: 'u894',
            fullname: 'kslmv sojks',
            imgUrl:
              'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
          },
        },
      ],
      likedByUserIds: ['u101', 'u102', 'u103'],
    });

    // ==========================================================================
    // 11 ===========================================================================

    spaces.push({
      _id: 's' + utilService.makeId(),
      name: 'Le Moulin - Piscine chauffée, Spa & Barbecue',
      imgUrls: [
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626397647/sprint4/spaces/11%20-%20Le%20Moulin%20-%20Piscine%20chauff%C3%A9e%2C%20Spa%20%20%20Barbecue/space/f5675226-8b64-4094-958c-beacccebe784_zwmtxs.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626397646/sprint4/spaces/11%20-%20Le%20Moulin%20-%20Piscine%20chauff%C3%A9e%2C%20Spa%20%20%20Barbecue/space/9cf5f6ff-9ce1-41d8-b60c-d7a5d4520ac0_tslfm3.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626397647/sprint4/spaces/11%20-%20Le%20Moulin%20-%20Piscine%20chauff%C3%A9e%2C%20Spa%20%20%20Barbecue/space/936e39d1-a9c0-42b1-9062-876c71cca3e6_s7mjl5.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626397646/sprint4/spaces/11%20-%20Le%20Moulin%20-%20Piscine%20chauff%C3%A9e%2C%20Spa%20%20%20Barbecue/space/b047a46c-b69e-49b0-8e64-fa8136885a24_cuhtqh.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626397643/sprint4/spaces/11%20-%20Le%20Moulin%20-%20Piscine%20chauff%C3%A9e%2C%20Spa%20%20%20Barbecue/space/14318248-be78-4157-bb01-1721d1e999e7_qtn5yk.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626397643/sprint4/spaces/11%20-%20Le%20Moulin%20-%20Piscine%20chauff%C3%A9e%2C%20Spa%20%20%20Barbecue/space/082f6d00-2814-4aef-a3e7-d34ae99a0ba4_zibpt8.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626397643/sprint4/spaces/11%20-%20Le%20Moulin%20-%20Piscine%20chauff%C3%A9e%2C%20Spa%20%20%20Barbecue/space/7b0cfed4-ecbc-4a22-b586-75eba0345b9c_uenkqm.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626397646/sprint4/spaces/11%20-%20Le%20Moulin%20-%20Piscine%20chauff%C3%A9e%2C%20Spa%20%20%20Barbecue/space/57eab9f5-e2da-4630-9bcb-d1b2e2310c9f_tdhepf.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626397646/sprint4/spaces/11%20-%20Le%20Moulin%20-%20Piscine%20chauff%C3%A9e%2C%20Spa%20%20%20Barbecue/space/9b71c853-e559-40e6-b32d-04638bc263ba_qrpai3.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626397651/sprint4/spaces/11%20-%20Le%20Moulin%20-%20Piscine%20chauff%C3%A9e%2C%20Spa%20%20%20Barbecue/space/9d8e6bcc-0612-4731-b6af-3569552cc6fe_czujko.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626397647/sprint4/spaces/11%20-%20Le%20Moulin%20-%20Piscine%20chauff%C3%A9e%2C%20Spa%20%20%20Barbecue/space/e313afc5-eeb5-4617-8a05-8d4795774dda_wxbxqd.webp',
      ],
      price: 886,
      description:
        `Located in a small village in the countryside, right in front of the Ravel, a long walk that leads to Maredsous, the house Le Moulin will be the ideal place for your stay with family or friends !

        You can enjoy long bike rides, a dip in the heated pool, a barbecue on the terrace and discover our beautiful region (Abbey of Maredsous, Valley of the Molignée, Lake Bambois,...).
        The space
        As the name suggests, the house was originally a mill built in 1898 before it was a family home for many years. So you'll be staying in an authentic home, warm and full of history.
        
        Located right in front of the RAVeL (an old railway redeveloped as a walkway) the house will be the perfect base for exploring the region : the Molignée Valley, Maredsous Abbey, Annevoie Gardens, Lake Bamboo, etc.
        
        On the program ? A dip in the heated pool, a barbecue on the terrace, long bike rides, a game of billiards, reading & relaxation, meeting with the animals of the house (our pony Zorro and Lima the Alpaca).
        Guest access
        The house is composed of 6 bedrooms, 2-3 bathrooms (2 in the house + 1 in the pool house) + 2 separate toilets, an equipped kitchen, relaxation areas and has a large garden with pool and barbecue.
        Other things to note
        Pet friendly. It is even possible to come with your horse, on request and at extra cost.
        
        Practical information:
        
        25min from Namur and 1h from Brussels
        Near Lake Bambois, Ravel, Mettet circuit, Maredsous, Namur
        Free parking on premises
        Secure parking
        6 bedrooms (5 double beds + 1 queen size bed)
        1 living room with television, without cable (DVDs available)
        Kitchen
        
        equipped Other remarks:
        
        Check-out until 20h, to be defined with us. This will depend on the day of departure and possible arrival of other visitors.`,
      capacity: 5,
      amenities: [
        'TV',
        'wifi',
        'bath',
        'kitchen',
        'free parking',
        'washing machine',
        'smoke alarm',
        'lockbox',
        'air conditioning',
        'security cameras',
      ],
      host: {
        _id: 'u101',
        fullname: 'Kathrin',
        imgUrl:
          'https://res.cloudinary.com/dymtestxz/image/upload/v1626397643/sprint4/spaces/11%20-%20Le%20Moulin%20-%20Piscine%20chauff%C3%A9e%2C%20Spa%20%20%20Barbecue/host/492c0f46-4c82-4e10-afb7-2221f999db49_wndnwu.webp',
      },
      loc: {
        country: 'Belgium',
        countryCode: '',
        address: 'Mettet, Wallonie',
        lat: 50.320150,
        lng: 4.657950,
      },
      reviews: [
        {
          _id: 'r102',
          txt: 'sdvmlvs adklmalkm wfbhlwekjfn aejfnhkjs.',
          rate: 4,
          by: {
            _id: 'u894',
            fullname: 'kslmv sojks',
            imgUrl:
              'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
          },
        },
      ],
      likedByUserIds: ['u101', 'u102', 'u103'],
    });

    // ==========================================================================
    // 12 ===========================================================================

    spaces.push({
      _id: 's' + utilService.makeId(),
      name: 'Hausboot auf der Mosel in Pölich',
      type: 'home',
      imgUrls: [
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626397960/sprint4/spaces/12%20-%20Hausboot%20auf%20der%20Mosel%20in%20P%C3%B6lich/space/d3b35b20-6aad-45ab-bb05-7dbba9906cac_ucuxbi.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626397960/sprint4/spaces/12%20-%20Hausboot%20auf%20der%20Mosel%20in%20P%C3%B6lich/space/c9ca74cb-5429-4ec5-b5a8-6e8eea5c1958_k04brc.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626397960/sprint4/spaces/12%20-%20Hausboot%20auf%20der%20Mosel%20in%20P%C3%B6lich/space/f0f39039-356f-4b49-bb76-bb029993ac9d_qawbnk.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626397959/sprint4/spaces/12%20-%20Hausboot%20auf%20der%20Mosel%20in%20P%C3%B6lich/space/d132bd86-e3ec-4586-98d9-626ab1aa3313_tvqlxw.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626397959/sprint4/spaces/12%20-%20Hausboot%20auf%20der%20Mosel%20in%20P%C3%B6lich/space/6b649140-e65b-489d-a7f1-946d73045346_y29cun.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626397959/sprint4/spaces/12%20-%20Hausboot%20auf%20der%20Mosel%20in%20P%C3%B6lich/space/c477e046-79ae-461d-86a2-2abe2dc72fc6_zyqynb.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626397960/sprint4/spaces/12%20-%20Hausboot%20auf%20der%20Mosel%20in%20P%C3%B6lich/space/b31b30ec-d32a-4abb-bdd5-408a7e5f4796_vdd9nu.webp',
      ],
      price: 207,
      description:
        `Living on the water. The houseboat is moored on the outer quay, with a direct view of the water. It has a bedroom with double bed, bathroom with shower, kitchen-living room with sofa bed, two terraces with outdoor kitchen. On the roof there is another large sun terrace with seating and loungers.

        The houseboat has WiFi 5G and TV. The kitchen has a toaster, Nespresso coffee machine. and kettle.
        
        Our guests can park right next to the houseboat.
        The space
        Living with a direct view of the water!
        Other things to note
        Many things are explained and discussed on site at check-in. In case there are still any questions, there is something on board ;-).`,
      capacity: 5,
      amenities: [
        'TV',
        'wifi',
        'bath',
        'kitchen',
        'free parking',
        'washing machine',
        'smoke alarm',
        'lockbox',
        'air conditioning',
        'security cameras',
      ],
      host: {
        _id: 'u101',
        fullname: 'Theodor',
        imgUrl:
          'https://res.cloudinary.com/dymtestxz/image/upload/v1626397959/sprint4/spaces/12%20-%20Hausboot%20auf%20der%20Mosel%20in%20P%C3%B6lich/host/21ecaf69-3231-4f28-8ee4-074f7fd79c55_a0rrqf.webp',
      },
      loc: {
        country: 'Germany',
        countryCode: 'GR',
        address: 'Pölich, Rheinland-Pfalz',
        lat: 49.798020,
        lng: 6.850310,
      },
      reviews: [
        {
          _id: 'r102',
          txt: 'sdvmlvs adklmalkm wfbhlwekjfn aejfnhkjs.',
          rate: {
            cleanliness: 2,
            checkin: 3,
            communication: 3,
            accuracy: 1,
            value: 5,
            location: 3,
          },
          by: {
            _id: 'u894',
            fullname: 'kslmv sojks',
            imgUrl:
              'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
          },
        },
      ],
      likedByUserIds: ['u101', 'u102', 'u103'],
    });

    // ==========================================================================
    // 13 ===========================================================================

    spaces.push({
      _id: 's' + utilService.makeId(),
      name: 'Masseria Il Frantoio with heated pool',
      type: 'home',
      imgUrls: [
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626398175/sprint4/spaces/13%20-%20Masseria%20Il%20Frantoio%20with%20heated%20pool/space/72ed6fdd-7574-458b-a566-3dd11121a611_lsgr6i.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626398179/sprint4/spaces/13%20-%20Masseria%20Il%20Frantoio%20with%20heated%20pool/space/e10686c3-351f-4608-842c-451db32d7ff9_qhasbo.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626398178/sprint4/spaces/13%20-%20Masseria%20Il%20Frantoio%20with%20heated%20pool/space/7408b57f-6268-4b6b-b1ba-e0d90e23a2df_fdz2p0.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626398175/sprint4/spaces/13%20-%20Masseria%20Il%20Frantoio%20with%20heated%20pool/space/34b8d34d-138f-41aa-ba3e-7365cae0dadc_vmegmy.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626398174/sprint4/spaces/13%20-%20Masseria%20Il%20Frantoio%20with%20heated%20pool/space/01c9dc6d-5d8b-4c51-9383-a93a02f6a600_q2gs0z.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626398179/sprint4/spaces/13%20-%20Masseria%20Il%20Frantoio%20with%20heated%20pool/space/fcad8286-e215-4c88-8160-2d808a93cb3d_z3kfps.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626398178/sprint4/spaces/13%20-%20Masseria%20Il%20Frantoio%20with%20heated%20pool/space/b938d855-3618-4b52-9cbb-1c8c102e52ab_zet1rl.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626398178/sprint4/spaces/13%20-%20Masseria%20Il%20Frantoio%20with%20heated%20pool/space/997e00ba-2749-4eba-b4a3-0a7b7fa6b9a2_pqnsrt.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626398178/sprint4/spaces/13%20-%20Masseria%20Il%20Frantoio%20with%20heated%20pool/space/dcfee9d9-25f5-4379-8d78-785cc4202709_ox9yoi.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626398174/sprint4/spaces/13%20-%20Masseria%20Il%20Frantoio%20with%20heated%20pool/space/69ebbf34-348a-4c8f-9c2c-c701aafa5070_de91ak.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626398178/sprint4/spaces/13%20-%20Masseria%20Il%20Frantoio%20with%20heated%20pool/space/8856fc5f-3c5f-4aaa-98ea-875e48c365da_isgbcy.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626398174/sprint4/spaces/13%20-%20Masseria%20Il%20Frantoio%20with%20heated%20pool/space/036aeb45-33ed-4536-8c30-0bc9269057ad_rmx4u2.webp',
        '',
      ],
      price: 1151,
      description:
        `This Masseria to rent is located on the doorstep of Ostuni, an iconic medieval village. Is located in centuries-old olive groves combines traditional Apulian architecture with modern and refined interiors. The ideal choice for those looking for:
        A Masseria for rent in Valle d'Itria with modern interiors
        A villa for rent for ten people just a few minutes from the sea
        A holiday in Ostuni in a villa with a heated swimming pool for private/exclusive use
        The space
        The main house, completely restored, with 5 spacious bedrooms and 4 bathrooms fully equipped is surrounded by bicentenary olive groves.
        INTERIORS
        Ground floor: the villa welcomes its guests through a large entrance hall featuring a fireplace and a guest bathroom. A large living room with fireplace and the charming dining area are perfect to enjoy an evening in relax, adjacent to those there is the kitchen, completely furnished with oven, induction hob, microwave, fridge with freezer, dishwasher, and Nespresso coffee machine.
        The three main bedrooms have all a private bathroom, a guest bathroom complete this floor.
        First floor: the charming external stairs drive the guests to the romantic bedroom with its own bathroom. Two terraces offer a breathtaking view of the sea and of the city of Ostuni.
        Basement: The real gem of this property is the old mill, preserved in its original charm. The guests could organize, dinners, wine and oil tastings in this fantastic scenary.
         
        All rooms can be heated or cooled.
        All rooms have direct access to the outside area.
        All bathrooms have a large shower, two sinks and a bidet.
        All doors and windows are protected by mosquito nets and massive steel grilles.
         
        EXTERIOR
        The private garden of about 1 hectare with a green flourishing lawn, offers several areas in which to un-wind.
        A majestic heated swimming pool (15m x 5m) for exclusive use and a shaded dining area with BBQ and outdoor sink, perfect to enjoy dinner under the stars and lunch with the family.
        This villa offers rest and relaxation, with clean lines, and neutral colors.
        Short drive (3 km away) from one of the most beautiful and unspoiled beaches of the Apulian coast: Costa Merlata
         
        In the immediate vicinity there are the following sports facilities:
        SPA and Fitness Resort
        Surf school
        Water ski
        Sailing
        Tennis
        Horse riding
        
        Ostuni is only a short drive away, with its famous 'White City', where you can enjoy the hassle and bustle of Italian life, just watching the world go by. Many bars and restaurants can be found around every corner.
        
        Size: 240 m2.
        
        Amenities: Hair Dryer, Bed Linen & Towels, Washing Machine, Dishwasher, Stereo, Balcony, Terrace, oven, microwave, toaster, internet connection, air conditioning, heating, swimming pool, Wheelchair access possible, FREE internet access, Fireplace, BBQ grill, Free weekly cleaning, Private parking, Massage, No Pets Allowed, Smoke Detectors, Temperature Control, Wireless Internet, Free cable internet, Private pool, Security camera at entrance, Patio, Car recommended, Carbon Monoxide Detector, Heated private pool, External Lighting, Fire Extinguisher;
        Bathroom: Hair Dryer, bidet, toilet, bath with shower, 2 x washbasin , Towels, mirror, Electrical adapters available, Window , Soap;
        Bathroom: Hair Dryer, bidet, toilet, bath with shower, 2 x washbasin , Towels, mirror, Electrical adapters available, Window , Soap;
        Bathroom: Hair Dryer, bidet, toilet, bath with shower, 2 x washbasin , Towels, mirror, Electrical adapters available, Window , Soap;
        Bathroom: Hair Dryer, bidet, toilet, bath with shower, washbasin , Towels, mirror, Soap;
        Bathroom: toilet, Bathroom, Laundry, washbasin ;
        Bedroom: double bed, night tables, chest of drawers, armchair, Towels, en suite bathroom, Heated Guest Rooms, Window ;
        Bedroom: double bed, night tables, desk, chest of drawers, armchair, Towels, en suite bathroom, Heating, Window ;
        Bedroom: double bed, night tables, desk, chest of drawers, armchair, Towels, en suite bathroom, Safe, Heating, Window ;
        Bedroom: double bed, night tables, desk, fridge, table and chairs, armchair, Fireplace, Towels, en suite bathroom, Chair, Seaview;
        Kitchen: Crockery & Cutlery, Washing Machine, Dishwasher, oven, microwave, fridge / freezer, coffee maker, dish rack, gas/electric hob, washbasin , dining table, Espresso-Machine, Smoke Detectors, Carbon Monoxide Detector, Fire Extinguisher;
        Living room: night tables, table and chairs, 2 x double sofa, Fireplace, mirror, Smart TV, Window ;
        Livingroom / Bedroom: TV, double sofa, Massage, Window ;`,
      capacity: 5,
      amenities: [
        'TV',
        'wifi',
        'bath',
        'kitchen',
        'free parking',
        'washing machine',
        'smoke alarm',
        'lockbox',
        'air conditioning',
        'security cameras',
      ],
      host: {
        _id: 'u101',
        fullname: 'Raro Realty',
        imgUrl:
          'https://res.cloudinary.com/dymtestxz/image/upload/v1626398174/sprint4/spaces/13%20-%20Masseria%20Il%20Frantoio%20with%20heated%20pool/host/66402b48-18af-40ea-b550-c4fb3d6e4c63_vmv6gh.webp',
      },
      loc: {
        country: 'Italy',
        countryCode: 'IT',
        address: 'Ostuni, Italy',
        lat: 40.728779,
        lng: 17.577370,
      },
      reviews: [
        {
          _id: 'r102',
          txt: 'sdvmlvs adklmalkm wfbhlwekjfn aejfnhkjs.',
          rate: {
            cleanliness: 2,
            checkin: 3,
            communication: 3,
            accuracy: 1,
            value: 5,
            location: 3,
          },
          by: {
            _id: 'u894',
            fullname: 'kslmv sojks',
            imgUrl:
              'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
          },
        },
      ],
      likedByUserIds: ['u101', 'u102', 'u103'],
    });

    // ==========================================================================
    // 14 ===========================================================================

    spaces.push({
      _id: 's' + utilService.makeId(),
      name: 'Charming villa with private pool located in Scopello',
      type: 'villa',

      imgUrls: [
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626398412/sprint4/spaces/14%20-%20Charming%20villa%20with%20private%20pool%20located%20in%20Scopello/space/f90e60c2-c974-453a-a748-d2bf3b0f635a_zx7dwl.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626398412/sprint4/spaces/14%20-%20Charming%20villa%20with%20private%20pool%20located%20in%20Scopello/space/cf8656b6-f413-4ceb-80ad-e1293c252984_ynj6zu.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626398412/sprint4/spaces/14%20-%20Charming%20villa%20with%20private%20pool%20located%20in%20Scopello/space/da4c1a8f-fed6-48e2-94ee-6e2277855095_uylfgt.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626398413/sprint4/spaces/14%20-%20Charming%20villa%20with%20private%20pool%20located%20in%20Scopello/space/ef2bc479-d8fa-43fd-8699-bfb734bc6687_bas5xm.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626398411/sprint4/spaces/14%20-%20Charming%20villa%20with%20private%20pool%20located%20in%20Scopello/space/304b4bc4-e267-4cfa-81e3-beaf278a3a6b_q6pn6w.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626398411/sprint4/spaces/14%20-%20Charming%20villa%20with%20private%20pool%20located%20in%20Scopello/space/5b7988d8-cb09-4546-9810-102034029f8e_urwptm.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626398412/sprint4/spaces/14%20-%20Charming%20villa%20with%20private%20pool%20located%20in%20Scopello/space/5e35de2d-94a4-4231-bfb2-f6dc2949e8ac_lh7nwf.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626398411/sprint4/spaces/14%20-%20Charming%20villa%20with%20private%20pool%20located%20in%20Scopello/space/027e8c86-4304-4b12-a2f9-94f6a9baa746_wjw2b6.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626398411/sprint4/spaces/14%20-%20Charming%20villa%20with%20private%20pool%20located%20in%20Scopello/space/51ee7c86-d901-4c99-bd01-29e05aa1c633_yydl6o.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626398411/sprint4/spaces/14%20-%20Charming%20villa%20with%20private%20pool%20located%20in%20Scopello/space/589ea8b8-d281-41f3-80cc-431dd460c6a6_u4k9dt.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626398412/sprint4/spaces/14%20-%20Charming%20villa%20with%20private%20pool%20located%20in%20Scopello/space/ab30190c-0771-44ed-acea-55cfa28ff6ae_qbjryg.webp',
      ],
      price: 499,
      description:
        `Enchanting villa with private pool located in Scopello, not far from the Tonnara and its bay, renowned for its crystal clear sea from which rise the imposing stacks.
        The property, located in a quiet and sunny position, overlooks a well-kept garden and a beautiful pool with its large sunny terraces, an awesome place for anyone to relax and unwind. The villa offers a range of outdoor areas equipped with garden furnitures and barbecue, as well as bright and well-divided interiors. Inside a particular attention was paid to details, materials and finishings. The rooms are furnished and equipped with all modern comforts.
        
        The property is spread over two floors: the ground floor consists of a bright open plan living which includes a well equipped kitchen. The shared bathroom is with shower. On the same floor there are three double bedrooms, two of which with en-suite bathroom. Another living room with kitchen is on the first floor. Here there are also two double bedrooms both with en-suite bathroom with shower.
        
        This villa is also the ideal starting point for exploring the fascinating places and natural beauties of Western Sicily. From the medieval village of Erice to the historic center of Trapani, from the wineries and the white salt pans of Marsala to the temple of Segesta, from the island of Mothia to the archipelago of the Egadi, from the beaches of San Vito Lo Capo to the natural Zingaro Reserve.
        
        Layout: Ground floor: (open kitchen, Living/diningroom, bedroom(double bed), bedroom(double bed), bedroom(double bed), bathroom(shower), bathroom(shower), bathroom(shower))
        
        On the 1st floor: (open kitchen, Living/diningroom, bedroom(double bed), bedroom(double bed), bathroom(shower), bathroom(shower))
        
        TV, electric kettle, toaster, oven, microwave, dishwasher, fridge-freezer, shower(outside), washing machine, terrace(private), garden(private), garden furniture, BBQ, BBQ, parking, swimming pool(private, 10 x 5 m., opened from 1/2 May upto and including Oct), iron, hairdryer, Blender`,
      capacity: 3,
      amenities: [
        'TV',
        'wifi',
        'bath',
        'kitchen',
        'free parking',
        'washing machine',
        'smoke alarm',
        'lockbox',
        'air conditioning',
        'security cameras',
      ],
      host: {
        _id: 'u101',
        fullname: 'Iris - BELVILLA',
        imgUrl:
          'https://res.cloudinary.com/dymtestxz/image/upload/v1626398411/sprint4/spaces/14%20-%20Charming%20villa%20with%20private%20pool%20located%20in%20Scopello/host/fa160aa1-65c9-422c-9b90-6155ef2da77b_xxi6ft.webp',
      },
      loc: {
        country: 'Italy',
        countryCode: 'IT',
        address: 'Castellammare del Golfo, Sicilia',
        lat: 38.019980,
        lng: 12.886870,
      },
      reviews: [
        {
          _id: 'r102',
          txt: 'sdvmlvs adklmalkm wfbhlwekjfn aejfnhkjs.',
          rate: {
            cleanliness: 2,
            checkin: 3,
            communication: 3,
            accuracy: 1,
            value: 5,
            location: 3,
          },
          by: {
            _id: 'u894',
            fullname: 'kslmv sojks',
            imgUrl:
              'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
          },
        },
      ],
      likedByUserIds: ['u101', 'u102', 'u103'],
    });

    // ==========================================================================
    // 15 ===========================================================================

    spaces.push({
      _id: 's' + utilService.makeId(),
      name: 'SA CASETA (CASETA PIPERA) - Beautiful country-house with private pool and garden Free WiFi',
      type: 'villa',
      imgUrls: [
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626398679/sprint4/spaces/15%20-%20SA%20CASETA%20%28CASETA%20PIPERA%29/space/7e62ef3d-ef53-43d1-9946-e4cb40e8568a_bd82el.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626398679/sprint4/spaces/15%20-%20SA%20CASETA%20%28CASETA%20PIPERA%29/space/b26e4e8f-4ed2-4c25-8d8d-b189de3d77a5_yzhtqz.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626398679/sprint4/spaces/15%20-%20SA%20CASETA%20%28CASETA%20PIPERA%29/space/7563c454-1d76-4fc5-9225-d5c1b6969903_shcn71.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626398679/sprint4/spaces/15%20-%20SA%20CASETA%20%28CASETA%20PIPERA%29/space/a81242bd-2aa5-4bb6-a11f-de37ffc65d7e_ngb7lu.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626398679/sprint4/spaces/15%20-%20SA%20CASETA%20%28CASETA%20PIPERA%29/space/a955c04e-6a10-47c9-bbec-d7fef69ff608_d0pivm.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626398679/sprint4/spaces/15%20-%20SA%20CASETA%20%28CASETA%20PIPERA%29/space/83a43e20-d674-4422-9dda-3340a1fd020a_yften0.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626398679/sprint4/spaces/15%20-%20SA%20CASETA%20%28CASETA%20PIPERA%29/space/9346994e-9cc7-4ef8-ad86-200449e52b3b_aekvzz.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626398679/sprint4/spaces/15%20-%20SA%20CASETA%20%28CASETA%20PIPERA%29/space/5130987d-ba8a-413c-b046-acae4525ed8e_wgnoea.webp',
      ],
      price: 310,
      description:
        `Welcome to this wonderful house on the outskirts of Manacor, with a marvellous garden, fully built with a Mallorca style but modern at the same time, to transform the vacation of 5 guests into an unforgettable memory.
        The space
        The great simplicity and liveliness of the exteriors of this finca precisely are what makes it specially fascinating. There's a great swimming-pool of 8.50 x 3.90 metres with a water depth of 1.50 metres. The garden, surrounded by the greenery with colourful touches and clar views over the fields, will be your best company during the delicious breakfast or the dinner in the terrace, covered by an elegant thatched roof. Just imagine, after tasting a delicious barbecue, lying at the sun on the cosy and little sofa made of pallet or on the three sun loungers. Although there are neighbours around, privacy is total.
        
        The interior of the house combines simplicity and modernity with all possible comforts and a great style, so it becomes a true home, funny, warm and relaxing. It works with solar panels, so it is fully sustainable, and it has two floors. On the main floor, when you enter, you fina a spacious sitting room with a comfortable sofa from where you can watch satellite TV, and a corner where you may read, for example. It is open to the dining area and the kitchen, the room of the house with a characteristic Mallorcan style thanks to the tiled countertop, the gas stove, the Mallorcan curtains and the large stone sink. The laundry room comes with a washing machine, an iron and an ironing board. Regarding the bedrooms, one is still on this floor and it has a double bed an a closet. Upstairs, there are two more bedrooms, one with twin beds and the other with a single bed. There are two shower bathrooms, one one each floor. Finally, the equipment is completed with a cot and a high chair, and three fans.
        
        The property is located just 2.5 km from Manacor, a little town where you will find all you need for a nice stay. About 16.6 km away you will reach the nearest beach in Portocristo, where you can spend a fantastic day between sand and dreamy waters. Nature and peace lovers find their place at the Natural Parl of Mondragó, or visiting the incomparable caves of Drach.
        
        There is exterior parking for 2 cars.
        Pets are not allowed.
        The holding of events is forbidden.
        Consult the advertiser for possible charges.
        The wood stove cannot be used.
        
        Distances
        Beach: 16.6 km - Playa de Portocristo
        Airport: 44.4 km - Son Sant Joan
        Golf course: 22.3 km - Club de Golf Son Servera
        Town: 2.5 km - Manacor
        Train station: 3.4 km - Estación Manacor
        Bus stop: 2.5 km - Manacor
        Ferry: 37 km - Puerto de Alcúdia
        Hospital: 2.5 km - Hospital de Manacor
        
        Tourist license: ETV/7447
        
        
        
        
        You will be asked for your personal information in order to submit the police registry form a few days before the check-in. Consult the advertiser for more information.
        Other things to note
        Arrival: from 4.00 pm
        Departure: before 10.00 am
        For arrivals after midnight (12.00 a.m.) a fee of 50€ may be charged, which the client has to pay in cash at the moment of check-in.
        License number
        ETV/7447`,
      capacity: 2,
      amenities: [
        'TV',
        'wifi',
        'bath',
        'kitchen',
        'free parking',
        'washing machine',
        'smoke alarm',
        'lockbox',
        'air conditioning',
        'security cameras',
      ],
      host: {
        _id: 'u101',
        fullname: 'Homerti',
        imgUrl:
          'https://res.cloudinary.com/dymtestxz/image/upload/v1626398679/sprint4/spaces/15%20-%20SA%20CASETA%20%28CASETA%20PIPERA%29/host/d679b420-a185-44ee-a2c7-c51eb773ea2d_ljszbd.webp',
      },
      loc: {
        country: 'Spain',
        countryCode: '',
        address: 'MANACOR, Spain',
        lat: 39.574340,
        lng: 3.201420,
      },
      reviews: [
        {
          _id: 'r102',
          txt: 'sdvmlvs adklmalkm wfbhlwekjfn aejfnhkjs.',
          rate: {
            cleanliness: 2,
            checkin: 3,
            communication: 3,
            accuracy: 1,
            value: 5,
            location: 3,
          },
          by: {
            _id: 'u894',
            fullname: 'kslmv sojks',
            imgUrl:
              'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
          },
        },
      ],
      likedByUserIds: ['u101', 'u102', 'u103'],
    });

    // ==========================================================================
    // 16 ===========================================================================

    spaces.push({
      _id: 's' + utilService.makeId(),
      name: 'Palm Pavilion: architectural rainforest retreat',
      type: 'house',
      imgUrls: [
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626398893/sprint4/spaces/16%20-%20Palm%20Pavilion%20architectural%20rainforest%20retreat/space/a9b33df6-7948-4161-8511-b5e796c9b009_qyxdw0.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626398893/sprint4/spaces/16%20-%20Palm%20Pavilion%20architectural%20rainforest%20retreat/space/e6b40af9-453a-42c4-9221-34443c62afab_rr4grr.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626398893/sprint4/spaces/16%20-%20Palm%20Pavilion%20architectural%20rainforest%20retreat/space/69071f32-bf28-4719-b8f4-4df3f72510cb_buiz56.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626398893/sprint4/spaces/16%20-%20Palm%20Pavilion%20architectural%20rainforest%20retreat/space/c025e3cc-827e-42ec-bc03-d58246f26522_eqtiwy.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626398893/sprint4/spaces/16%20-%20Palm%20Pavilion%20architectural%20rainforest%20retreat/space/ec867c2e-bf9b-422e-9065-9c8be845fb64_uopfpn.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626398892/sprint4/spaces/16%20-%20Palm%20Pavilion%20architectural%20rainforest%20retreat/space/78485c6e-c646-48cc-b05a-da8e5c580a49_tr3wu8.webp',
        'https://res.cloudinary.com/dymtestxz/image/upload/v1626398893/sprint4/spaces/16%20-%20Palm%20Pavilion%20architectural%20rainforest%20retreat/space/99eba3f3-5a5d-4458-9306-ac2f3e0faf10_czkfii.webp',
      ],
      price: 667,
      description:
        `45 minutes from the CBD, Palm Pavilion offers a boutique escape for connecting with loved ones or working in peace. This award-winning, multi-purpose container house is built on the edge of Ku-ring-gai Chase National Park, with a luxury feel and mindful architecture that centres on sustainability, seclusion and tranquility. Offering floor-to-ceiling rainforest views and a full suite of amenities, Palm Pavilion is an oasis for cutting out noise and sharing what matters.`,
      capacity: 8,
      amenities: [
        'TV',
        'wifi',
        'bath',
        'kitchen',
        'free parking',
        'washing machine',
        'smoke alarm',
        'lockbox',
        'air conditioning',
        'security cameras',
      ],
      host: {
        _id: 'u101',
        fullname: 'Rebecca',
        imgUrl:
          'https://res.cloudinary.com/dymtestxz/image/upload/v1626398892/sprint4/spaces/16%20-%20Palm%20Pavilion%20architectural%20rainforest%20retreat/host/b5493e17-d7b5-4aa3-acf5-64d338bd5e5c_iborav.webp',
      },
      loc: {
        country: 'Australia',
        countryCode: 'AU',
        address: 'Church Point, New South Wales',
        lat: -33.645190,
        lng: 151.284980,
      },
      reviews: [
        {
          _id: 'r102',
          txt: 'sdvmlvs adklmalkm wfbhlwekjfn aejfnhkjs.',
          rate: {
            cleanliness: 2,
            checkin: 3,
            communication: 3,
            accuracy: 1,
            value: 5,
            location: 3,
          },
          by: {
            _id: 'u894',
            fullname: 'kslmv sojks',
            imgUrl:
              'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
          },
        },
      ],
      likedByUserIds: ['u101', 'u102', 'u103'],
    });

    // ==========================================================================
    // ===========================================================================

    storageService.postMany(SPACE_KEY, spaces);
  }
  return spaces;
}
