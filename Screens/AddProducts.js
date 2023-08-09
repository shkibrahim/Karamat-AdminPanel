import React from 'react';
import { useEffect, useState, useRef } from 'react';
import iconFont from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
import { utils } from '@react-native-firebase/app';

import Modal from "react-native-modal";
import { useForm, Controller } from 'react-hook-form';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import ImagePicker from 'react-native-image-crop-picker';
import {
  View, TextInput,
  Text,
  TouchableOpacity,
  StyleSheet, Animated, Button,
  Pressable, Dimensions, FlatList, ActivityIndicator,
  ScrollView, Keyboard,
  Image,
  ImageBackground,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { Picker } from '@react-native-picker/picker';
const AddProducts = ({ navigation }) => {
  // const { control } = useForm();
  // const [crimeOpen, setcrimeOpen] = useState();
  // const [crimeValue, setcrimeValue] = useState();
  // const [crime, setcrime] = useState([
  //   { label: 'Murder', value: 'Murder' },
  //   { label: 'Robbery', value: 'Robbery' },
  //   { label: 'Rape', value: 'Rape' },
  //   { label: 'Kidnapping', value: 'Kidnapping' },
  // ]);
  // const Type = [
  //   {Type: 'Afghanistan', code: '93', iso: 'AF'},
  //   {Type: 'Albania', code: '355', iso: 'AL'},
  //   {Type: 'Algeria', code: '213', iso: 'DZ'},
  //   {Type: 'American Samoa', code: '1-684', iso: 'AS'},
  //   {Type: 'Andorra', code: '376', iso: 'AD'},
  //   {Type: 'Angola', code: '244', iso: 'AO'},
  //   {Type: 'Anguilla', code: '1-264', iso: 'AI'},
  //   {Type: 'Antarctica', code: '672', iso: 'AQ'},
  //   {Type: 'Antigua and Barbuda', code: '1-268', iso: 'AG'},
  //   {Type: 'Argentina', code: '54', iso: 'AR'},
  //   {Type: 'Armenia', code: '374', iso: 'AM'},
  //   {Type: 'Aruba', code: '297', iso: 'AW'},
  //   {Type: 'Australia', code: '61', iso: 'AU'},
  //   {Type: 'Austria', code: '43', iso: 'AT'},
  //   {Type: 'Azerbaijan', code: '994', iso: 'AZ'},
  //   {Type: 'Bahamas', code: '1-242', iso: 'BS'},
  //   {Type: 'Bahrain', code: '973', iso: 'BH'},
  //   {Type: 'Bangladesh', code: '880', iso: 'BD'},
  //   {Type: 'Barbados', code: '1-246', iso: 'BB'},
  //   {Type: 'Belarus', code: '375', iso: 'BY'},
  //   {Type: 'Belgium', code: '32', iso: 'BE'},
  //   {Type: 'Belize', code: '501', iso: 'BZ'},
  //   {Type: 'Benin', code: '229', iso: 'BJ'},
  //   {Type: 'Bermuda', code: '1-441', iso: 'BM'},
  //   {Type: 'Bhutan', code: '975', iso: 'BT'},
  //   {Type: 'Bolivia', code: '591', iso: 'BO'},
  //   {Type: 'Bosnia and Herzegovina', code: '387', iso: 'BA'},
  //   {Type: 'Botswana', code: '267', iso: 'BW'},
  //   {Type: 'Brazil', code: '55', iso: 'BR'},
  //   {Type: 'British Indian Ocean Territory', code: '246', iso: 'IO'},
  //   {Type: 'British Virgin Islands', code: '1-284', iso: 'VG'},
  //   {Type: 'Brunei', code: '673', iso: 'BN'},
  //   {Type: 'Bulgaria', code: '359', iso: 'BG'},
  //   {Type: 'Burkina Faso', code: '226', iso: 'BF'},
  //   {Type: 'Burundi', code: '257', iso: 'BI'},
  //   {Type: 'Cambodia', code: '855', iso: 'KH'},
  //   {Type: 'Cameroon', code: '237', iso: 'CM'},
  //   {Type: 'Canada', code: '1', iso: 'CA'},
  //   {Type: 'Cape Verde', code: '238', iso: 'CV'},
  //   {Type: 'Cayman Islands', code: '1-345', iso: 'KY'},
  //   {Type: 'Central African Republic', code: '236', iso: 'CF'},
  //   {Type: 'Chad', code: '235', iso: 'TD'},
  //   {Type: 'Chile', code: '56', iso: 'CL'},
  //   {Type: 'China', code: '86', iso: 'CN'},
  //   {Type: 'Christmas Island', code: '61', iso: 'CX'},
  //   {Type: 'Cocos Islands', code: '61', iso: 'CC'},
  //   {Type: 'Colombia', code: '57', iso: 'CO'},
  //   {Type: 'Comoros', code: '269', iso: 'KM'},
  //   {Type: 'Cook Islands', code: '682', iso: 'CK'},
  //   {Type: 'Costa Rica', code: '506', iso: 'CR'},
  //   {Type: 'Croatia', code: '385', iso: 'HR'},
  //   {Type: 'Cuba', code: '53', iso: 'CU'},
  //   {Type: 'Curacao', code: '599', iso: 'CW'},
  //   {Type: 'Cyprus', code: '357', iso: 'CY'},
  //   {Type: 'Czech Republic', code: '420', iso: 'CZ'},
  //   {Type: 'Democratic Republic of the Congo', code: '243', iso: 'CD'},
  //   {Type: 'Denmark', code: '45', iso: 'DK'},
  //   {Type: 'Djibouti', code: '253', iso: 'DJ'},
  //   {Type: 'Dominica', code: '1-767', iso: 'DM'},
  //   {Type: 'Dominican Republic', code: '1-809, 1-829, 1-849', iso: 'DO'},
  //   {Type: 'East Timor', code: '670', iso: 'TL'},
  //   {Type: 'Ecuador', code: '593', iso: 'EC'},
  //   {Type: 'Egypt', code: '20', iso: 'EG'},
  //   {Type: 'El Salvador', code: '503', iso: 'SV'},
  //   {Type: 'Equatorial Guinea', code: '240', iso: 'GQ'},
  //   {Type: 'Eritrea', code: '291', iso: 'ER'},
  //   {Type: 'Estonia', code: '372', iso: 'EE'},
  //   {Type: 'Ethiopia', code: '251', iso: 'ET'},
  //   {Type: 'Falkland Islands', code: '500', iso: 'FK'},
  //   {Type: 'Faroe Islands', code: '298', iso: 'FO'},
  //   {Type: 'Fiji', code: '679', iso: 'FJ'},
  //   {Type: 'Finland', code: '358', iso: 'FI'},
  //   {Type: 'France', code: '33', iso: 'FR'},
  //   {Type: 'French Polynesia', code: '689', iso: 'PF'},
  //   {Type: 'Gabon', code: '241', iso: 'GA'},
  //   {Type: 'Gambia', code: '220', iso: 'GM'},
  //   {Type: 'Georgia', code: '995', iso: 'GE'},
  //   {Type: 'Germany', code: '49', iso: 'DE'},
  //   {Type: 'Ghana', code: '233', iso: 'GH'},
  //   {Type: 'Gibraltar', code: '350', iso: 'GI'},
  //   {Type: 'Greece', code: '30', iso: 'GR'},
  //   {Type: 'Greenland', code: '299', iso: 'GL'},
  //   {Type: 'Grenada', code: '1-473', iso: 'GD'},
  //   {Type: 'Guam', code: '1-671', iso: 'GU'},
  //   {Type: 'Guatemala', code: '502', iso: 'GT'},
  //   {Type: 'Guernsey', code: '44-1481', iso: 'GG'},
  //   {Type: 'Guinea', code: '224', iso: 'GN'},
  //   {Type: 'Guinea-Bissau', code: '245', iso: 'GW'},
  //   {Type: 'Guyana', code: '592', iso: 'GY'},
  //   {Type: 'Haiti', code: '509', iso: 'HT'},
  //   {Type: 'Honduras', code: '504', iso: 'HN'},
  //   {Type: 'Hong Kong', code: '852', iso: 'HK'},
  //   {Type: 'Hungary', code: '36', iso: 'HU'},
  //   {Type: 'Iceland', code: '354', iso: 'IS'},
  //   {Type: 'India', code: '91', iso: 'IN'},
  //   {Type: 'Indonesia', code: '62', iso: 'ID'},
  //   {Type: 'Iran', code: '98', iso: 'IR'},
  //   {Type: 'Iraq', code: '964', iso: 'IQ'},
  //   {Type: 'Ireland', code: '353', iso: 'IE'},
  //   {Type: 'Isle of Man', code: '44-1624', iso: 'IM'},
  //   {Type: 'Israel', code: '972', iso: 'IL'},
  //   {Type: 'Italy', code: '39', iso: 'IT'},
  //   {Type: 'Ivory Coast', code: '225', iso: 'CI'},
  //   {Type: 'Jamaica', code: '1-876', iso: 'JM'},
  //   {Type: 'Japan', code: '81', iso: 'JP'},
  //   {Type: 'Jersey', code: '44-1534', iso: 'JE'},
  //   {Type: 'Jordan', code: '962', iso: 'JO'},
  //   {Type: 'Kazakhstan', code: '7', iso: 'KZ'},
  //   {Type: 'Kenya', code: '254', iso: 'KE'},
  //   {Type: 'Kiribati', code: '686', iso: 'KI'},
  //   {Type: 'Kosovo', code: '383', iso: 'XK'},
  //   {Type: 'Kuwait', code: '965', iso: 'KW'},
  //   {Type: 'Kyrgyzstan', code: '996', iso: 'KG'},
  //   {Type: 'Laos', code: '856', iso: 'LA'},
  //   {Type: 'Latvia', code: '371', iso: 'LV'},
  //   {Type: 'Lebanon', code: '961', iso: 'LB'},
  //   {Type: 'Lesotho', code: '266', iso: 'LS'},
  //   {Type: 'Liberia', code: '231', iso: 'LR'},
  //   {Type: 'Libya', code: '218', iso: 'LY'},
  //   {Type: 'Liechtenstein', code: '423', iso: 'LI'},
  //   {Type: 'Lithuania', code: '370', iso: 'LT'},
  //   {Type: 'Luxembourg', code: '352', iso: 'LU'},
  //   {Type: 'Macao', code: '853', iso: 'MO'},
  //   {Type: 'Macedonia', code: '389', iso: 'MK'},
  //   {Type: 'Madagascar', code: '261', iso: 'MG'},
  //   {Type: 'Malawi', code: '265', iso: 'MW'},
  //   {Type: 'Malaysia', code: '60', iso: 'MY'},
  //   {Type: 'Maldives', code: '960', iso: 'MV'},
  //   {Type: 'Mali', code: '223', iso: 'ML'},
  //   {Type: 'Malta', code: '356', iso: 'MT'},
  //   {Type: 'Marshall Islands', code: '692', iso: 'MH'},
  //   {Type: 'Mauritania', code: '222', iso: 'MR'},
  //   {Type: 'Mauritius', code: '230', iso: 'MU'},
  //   {Type: 'Mayotte', code: '262', iso: 'YT'},
  //   {Type: 'Mexico', code: '52', iso: 'MX'},
  //   {Type: 'Micronesia', code: '691', iso: 'FM'},
  //   {Type: 'Moldova', code: '373', iso: 'MD'},
  //   {Type: 'Monaco', code: '377', iso: 'MC'},
  //   {Type: 'Mongolia', code: '976', iso: 'MN'},
  //   {Type: 'Montenegro', code: '382', iso: 'ME'},
  //   {Type: 'Montserrat', code: '1-664', iso: 'MS'},
  //   {Type: 'Morocco', code: '212', iso: 'MA'},
  //   {Type: 'Mozambique', code: '258', iso: 'MZ'},
  //   {Type: 'Myanmar', code: '95', iso: 'MM'},
  //   {Type: 'Namibia', code: '264', iso: 'NA'},
  //   {Type: 'Nauru', code: '674', iso: 'NR'},
  //   {Type: 'Nepal', code: '977', iso: 'NP'},
  //   {Type: 'Netherlands', code: '31', iso: 'NL'},
  //   {Type: 'Netherlands Antilles', code: '599', iso: 'AN'},
  //   {Type: 'New Caledonia', code: '687', iso: 'NC'},
  //   {Type: 'New Zealand', code: '64', iso: 'NZ'},
  //   {Type: 'Nicaragua', code: '505', iso: 'NI'},
  //   {Type: 'Niger', code: '227', iso: 'NE'},
  //   {Type: 'Nigeria', code: '234', iso: 'NG'},
  //   {Type: 'Niue', code: '683', iso: 'NU'},
  //   {Type: 'North Korea', code: '850', iso: 'KP'},
  //   {Type: 'Northern Mariana Islands', code: '1-670', iso: 'MP'},
  //   {Type: 'Norway', code: '47', iso: 'NO'},
  //   {Type: 'Oman', code: '968', iso: 'OM'},
  //   {Type: 'Pakistan', code: '92', iso: 'PK'},
  //   {Type: 'Palau', code: '680', iso: 'PW'},
  //   {Type: 'Palestine', code: '970', iso: 'PS'},
  //   {Type: 'Panama', code: '507', iso: 'PA'},
  //   {Type: 'Papua New Guinea', code: '675', iso: 'PG'},
  //   {Type: 'Paraguay', code: '595', iso: 'PY'},
  //   {Type: 'Peru', code: '51', iso: 'PE'},
  //   {Type: 'Philippines', code: '63', iso: 'PH'},
  //   {Type: 'Pitcairn', code: '64', iso: 'PN'},
  //   {Type: 'Poland', code: '48', iso: 'PL'},
  //   {Type: 'Portugal', code: '351', iso: 'PT'},
  //   {Type: 'Puerto Rico', code: '1-787, 1-939', iso: 'PR'},
  //   {Type: 'Qatar', code: '974', iso: 'QA'},
  //   {Type: 'Republic of the Congo', code: '242', iso: 'CG'},
  //   {Type: 'Reunion', code: '262', iso: 'RE'},
  //   {Type: 'Romania', code: '40', iso: 'RO'},
  //   {Type: 'Russia', code: '7', iso: 'RU'},
  //   {Type: 'Rwanda', code: '250', iso: 'RW'},
  //   {Type: 'Saint Barthelemy', code: '590', iso: 'BL'},
  //   {Type: 'Saint Helena', code: '290', iso: 'SH'},
  //   {Type: 'Saint Kitts and Nevis', code: '1-869', iso: 'KN'},
  //   {Type: 'Saint Lucia', code: '1-758', iso: 'LC'},
  //   {Type: 'Saint Martin', code: '590', iso: 'MF'},
  //   {Type: 'Saint Pierre and Miquelon', code: '508', iso: 'PM'},
  //   {Type: 'Saint Vincent and the Grenadines', code: '1-784', iso: 'VC'},
  //   {Type: 'Samoa', code: '685', iso: 'WS'},
  //   {Type: 'San Marino', code: '378', iso: 'SM'},
  //   {Type: 'Sao Tome and Principe', code: '239', iso: 'ST'},
  //   {Type: 'Saudi Arabia', code: '966', iso: 'SA'},
  //   {Type: 'Senegal', code: '221', iso: 'SN'},
  //   {Type: 'Serbia', code: '381', iso: 'RS'},
  //   {Type: 'Seychelles', code: '248', iso: 'SC'},
  //   {Type: 'Sierra Leone', code: '232', iso: 'SL'},
  //   {Type: 'Singapore', code: '65', iso: 'SG'},
  //   {Type: 'Sint Maarten', code: '1-721', iso: 'SX'},
  //   {Type: 'Slovakia', code: '421', iso: 'SK'},
  //   {Type: 'Slovenia', code: '386', iso: 'SI'},
  //   {Type: 'Solomon Islands', code: '677', iso: 'SB'},
  //   {Type: 'Somalia', code: '252', iso: 'SO'},
  //   {Type: 'South Africa', code: '27', iso: 'ZA'},
  //   {Type: 'South Korea', code: '82', iso: 'KR'},
  //   {Type: 'South Sudan', code: '211', iso: 'SS'},
  //   {Type: 'Spain', code: '34', iso: 'ES'},
  //   {Type: 'Sri Lanka', code: '94', iso: 'LK'},
  //   {Type: 'Sudan', code: '249', iso: 'SD'},
  //   {Type: 'Suriname', code: '597', iso: 'SR'},
  //   {Type: 'Svalbard and Jan Mayen', code: '47', iso: 'SJ'},
  //   {Type: 'Swaziland', code: '268', iso: 'SZ'},
  //   {Type: 'Sweden', code: '46', iso: 'SE'},
  //   {Type: 'Switzerland', code: '41', iso: 'CH'},
  //   {Type: 'Syria', code: '963', iso: 'SY'},
  //   {Type: 'Taiwan', code: '886', iso: 'TW'},
  //   {Type: 'Tajikistan', code: '992', iso: 'TJ'},
  //   {Type: 'Tanzania', code: '255', iso: 'TZ'},
  //   {Type: 'Thailand', code: '66', iso: 'TH'},
  //   {Type: 'Togo', code: '228', iso: 'TG'},
  //   {Type: 'Tokelau', code: '690', iso: 'TK'},
  //   {Type: 'Tonga', code: '676', iso: 'TO'},
  //   {Type: 'Trinidad and Tobago', code: '1-868', iso: 'TT'},
  //   {Type: 'Tunisia', code: '216', iso: 'TN'},
  //   {Type: 'Turkey', code: '90', iso: 'TR'},
  //   {Type: 'Turkmenistan', code: '993', iso: 'TM'},
  //   {Type: 'Turks and Caicos Islands', code: '1-649', iso: 'TC'},
  //   {Type: 'Tuvalu', code: '688', iso: 'TV'},
  //   {Type: 'U.S. Virgin Islands', code: '1-340', iso: 'VI'},
  //   {Type: 'Uganda', code: '256', iso: 'UG'},
  //   {Type: 'Ukraine', code: '380', iso: 'UA'},
  //   {Type: 'United Arab Emirates', code: '971', iso: 'AE'},
  //   {Type: 'United Kingdom', code: '44', iso: 'GB'},
  //   {Type: 'United States', code: '1', iso: 'US'},
  //   {Type: 'Uruguay', code: '598', iso: 'UY'},
  //   {Type: 'Uzbekistan', code: '998', iso: 'UZ'},
  //   {Type: 'Vanuatu', code: '678', iso: 'VU'},
  //   {Type: 'Vatican', code: '379', iso: 'VA'},
  //   {Type: 'Venezuela', code: '58', iso: 'VE'},
  //   {Type: 'Vietnam', code: '84', iso: 'VN'},
  //   {Type: 'Wallis and Futuna', code: '681', iso: 'WF'},
  //   {Type: 'Western Sahara', code: '212', iso: 'EH'},
  //   {Type: 'Yemen', code: '967', iso: 'YE'},
  //   {Type: 'Zambia', code: '260', iso: 'ZM'},
  //   {Type: 'Zimbabwe', code: '263', iso: 'ZW'},
  // ];





  const [isLoading, setIsLoading] = useState(false);

  // const uriToFile = async (uri) => {
    //         const response = await fetch(uri);
    //         const blob = await response.blob();
    //         onst filename = uri.substring(uri.lastIndexOf('/') + 1);
    //         return new File([blob], filename);
    //       };
    //        const selectedImagesAsFiles = await Promise.all(SelectedImages.map(uriToFile));
  
    //       // Convert locationImages array to File objects
    //       const locationImagesAsFiles = await Promise.all(LocationImages.map(uriToFile));
    //       console.log(SelectedImages)
    //       console.log(LocationImages)
    //       console.log(selectedUrls)
    //       console.log(locationUrls)
    //       // Upload selectedImages and locationImages to Firebase Storage
    //       const selectedUrls = await uploadSelectedImagesToFirebaseStorage(selectedImagesAsFiles);
    //       const locationUrls = await uploadLocationImagesToFirebaseStorage(locationImagesAsFiles);
    // console.log(SelectedImages)
    // console.log(LocationImages)
    // console.log(selectedUrls)
    // console.log(locationUrls)

  const Type = [
    { Type: 'Shawl', code: '93', iso: 'AF' },
    { Type: 'Duppata', code: '93', iso: 'AF' },
    { Type: 'Stoller', code: '93', iso: 'AF' },
    { Type: 'Burka', code: '93', iso: 'AF' }
  ]
  const [search, setSearch] = useState('');
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState(Type);

  const searchRef = useRef();
  const onSearch = search => {
    if (search !== '') {
      let tempData = data.filter(item => {
        return item.Type.toLowerCase().indexOf(search.toLowerCase()) > -1;
      });
      setData(tempData);
    } else {
      setData(Type);
    }
  };

  const [selectedMonth, setSelectedMonth] = useState('May');
  const [Months] = useState([
    'January',
    'February',

  ]);



  const iconFontStyles = `@font-face {
    src: url(${iconFont});
    font-family: FontAwesome;
  }`;
  state = {
    visibleModal: null,
  };
  const windowHeight = Dimensions.get('window').height;

  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const scrollViewRef = useRef(null);

  useEffect(() => {
    const delay = 5000; // Delay between stopping at each component (in milliseconds)
    const scrollDuration = 9000; // Duration for a complete scroll (in milliseconds)
    const componentWidth = 10000; // Width of each component

    let timeoutId;

    const startScrollAnimation = () => {
      const scrollX = scrollViewRef.current?.contentOffset?.x || 0;
      const componentIndex = Math.floor(scrollX / componentWidth);
      const targetOffset = (componentIndex + 10) * componentWidth;

      scrollViewRef.current?.scrollTo({ x: targetOffset, animated: true });

      timeoutId = setTimeout(() => {
        startScrollAnimation();
      }, scrollDuration + delay);
    };


    startScrollAnimation(); // Start the initial animation

    // Clean up the timeout on unmount
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const handleScrollEnd = (event) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const contentOffsetX = contentOffset.x;
    const contentWidth = contentSize.width;
    const containerWidth = layoutMeasurement.width;

    if (contentOffsetX + containerWidth >= contentWidth) {
      // Reached the end of ScrollView, scroll back to the beginning
      scrollViewRef.current.scrollTo({ x: 0, animated: true });
    }
  };

  const [isChecked, setChecked] = useState(false);

  const handleToggleCheckbox = () => {
    setChecked(!isChecked);
  };








  const [ProductQuantity, setProductQuantity] = useState();
  const [OriginalPrice, setOriginalPrice] = useState();
  const [WholesalePrice, setWholesalePrice] = useState();
  const [ProductName, setProductName] = useState();
  const [ProductCode, setProductCode] = useState();
  const [ProductCompany, setProductCompany] = useState();
  const [Location, setLocation] = useState();



  const [Description, setDescription] = useState();
  const [selectedType, setSelectedType] = useState('');


  
  const [selecteduri, setselecteduri] = useState([]);

  const handleOpenImagePicker = () => {

    const remainingSlots = 5 - SelectedImages.length;

    if (remainingSlots <= 0) {
      alert('You can select up to 5 media items.');
      return;
    }
    ImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo',
      maxFiles: remainingSlots,
      includeBase64: false, // Set to true if you want to get base64 encoded images
    })
      .then(images => {
        const urisP = images.map(image => image.path);
        setselecteduri(prevImages => [...prevImages, ...urisP]);
        setSelectedImages(prevImages => [...prevImages, ...images]);
      })
      .catch(error => console.log('Error:', error));
      console.log(selecteduri)

  };
  const handleRemoveMedia = (index) => {
    const newSelectedMedia = [...SelectedImages];
    newSelectedMedia.splice(index, 1);
    setSelectedImages(newSelectedMedia);
  };
  const renderItem = ({ item, index }) => (
    <View style={styles.mediaContainer}>
      {item.mime && item.mime.startsWith('image/') ? (
        <Image source={{ uri: item.path }} style={styles.mediaThumbnail} />
      ) : (
        <Text>Video</Text>
      )}
      <TouchableOpacity onPress={() => handleRemoveMedia(index)} style={styles.removeButton}>
        <Text style={styles.removeButtonText}>X</Text>
      </TouchableOpacity>
    </View>

  );

  const [Locationuri, setLocationuri] = useState([]);
  // location image code
  const handlelocationimage = () => {
    const remainingSlots = 5 - LocationImages.length;
  
    if (remainingSlots <= 0) {
      alert('You can select up to 5 media items.');
      return;
    }
  
    const options = {
      multiple: true,
      mediaType: 'photo',
      maxFiles: remainingSlots,
      includeBase64: false, // Set to true if you want to get base64 encoded images
    };
  
    ImagePicker.openPicker(options)
      .then(images => {
        // Extract the URIs from the response and add them to the state
        const urisL = images.map(image => image.path);
        setLocationuri(prevImages => [...prevImages, ...urisL]);
        setLocationImages(prevImages => [...prevImages, ...images]);
      })
     
      .catch(error => console.log('Error:', error));
      console.log(Locationuri)
  };

  const handleRemoveLocation = (index) => {
    const newSelectedLocation = [...LocationImages];
    newSelectedLocation.splice(index, 1);
    setLocationImages(newSelectedLocation);
  };
  const renderItem2 = ({ item, index }) => (
    <View style={styles.mediaContainer}>
      {item.mime && item.mime.startsWith('image/') ? (
        <Image source={{ uri: item.path }} style={styles.mediaThumbnail} />
      ) : (
        <Text>Video</Text>
      )}
      <TouchableOpacity onPress={() => handleRemoveLocation(index)} style={styles.removeButton}>
        <Text style={styles.removeButtonText}>X</Text>
      </TouchableOpacity>
    </View>
  );



  const [SelectedImages, setSelectedImages] = useState([]);
  const [LocationImages, setLocationImages] = useState([]);
  const uploadSelectedImagesToFirebaseStorage = async (SelectedImages) => {
    try {
      const storageRef = storage().ref();
  
      const uploadPromises = SelectedImages.map((image) => {
        // Generate a unique name for each image using the current timestamp
        const imageName = Date.now().toString() + '_' + image.name;
  
        // Create a reference to the storage location where you want to store the image for SelectedImages
        const imageRef = storageRef.child('SelectedImages/' + imageName);
  
        // Start the upload process
        return imageRef.put(image);
      });
  
      // Wait for all the uploads to complete
      const uploadSnapshots = await Promise.all(uploadPromises);
  
      // Get the download URLs of all the uploaded images for SelectedImages
      const downloadURLs = await Promise.all(
        uploadSnapshots.map((snapshot) => snapshot.ref.getDownloadURL())
      );
  
      // 'downloadURLs' will now contain an array of download URLs of all the uploaded images for SelectedImages
      console.log('Download URLs for SelectedImages:', downloadURLs);
  
      // You can now use these download URLs to store the image references in your database or use them in your app for SelectedImages.
    } catch (error) {
      console.error('Error uploading SelectedImages:', error);
    }
  };
  
  const uploadLocationImagesToFirebaseStorage = async (LocationImages) => {
    try {
      const storageRef = storage().ref();
  
      const uploadPromises = LocationImages.map((image) => {
        // Generate a unique name for each image using the current timestamp
        const imageName = Date.now().toString() + '_' + image.name;
  
        // Create a reference to the storage location where you want to store the image for locationImages
        const imageRef = storageRef.child('LocationImages/' + imageName);
  
        // Start the upload process
        return imageRef.put(image);
      });
  
      // Wait for all the uploads to complete
      const uploadSnapshots = await Promise.all(uploadPromises);
  
      // Get the download URLs of all the uploaded images for locationImages
      const downloadURLs = await Promise.all(
        uploadSnapshots.map((snapshot) => snapshot.ref.getDownloadURL())
      );
  
      // 'downloadURLs' will now contain an array of download URLs of all the uploaded images for locationImages
      console.log('Download URLs for locationImages:', downloadURLs);
  
      // You can now use these download URLs to store the image references in your database or use them in your app for locationImages.
    } catch (error) {
      console.error('Error uploading locationImages:', error);
    }
  };
  const [selectedImageUrl, setSelectedImageUrl] = useState('');
  const [selectedImageUrlL, setSelectedImageUrlL] = useState('');
  const [selectedImage1, setSelectedImage1] = useState(null);

  const imageUrls = [];
  const uploadImagesToFirebase = async () => {
    try {
      

      // Upload each selected image to Firebase Storage
      for (const image of SelectedImages) {
        const reference = storage().ref(`images/${image.path}`);
        await reference.putFile(image.path);

        const url = await reference.getDownloadURL();
        imageUrls.push(url);
      }

      console.log('Image URLs in Firebase:', imageUrls);

      // Here, you can save the image URLs in your database if needed.

      // Clear selected images after uploading to Firebase
      setSelectedImages([]);
    } catch (error) {
      console.log('Error uploading images to Firebase:', error);
    }
  };

  const imageLocationUrls = [];
  const uploadImagesToFirebaseLocation = async () => {
    try {
     

      // Upload each selected image to Firebase Storage
      for (const image of LocationImages) {
        const reference = storage().ref(`images/${image.path}`);
        await reference.putFile(image.path);

        const url = await reference.getDownloadURL();
        imageLocationUrls.push(url);
      }

      console.log('Image URLs in Firebase:', imageLocationUrls);

      // Here, you can save the image URLs in your database if needed.

      // Clear selected images after uploading to Firebase
      setLocationImages([]);
    } catch (error) {
      console.log('Error uploading images to Firebase:', error);
    }
  };
  var AddProduct = async () => {
    setIsLoading(true);
    if (
      Description == null ||
      selectedType == null ||
      Location == null ||
      WholesalePrice == null ||
      OriginalPrice == null ||
      ProductQuantity == null ||
      ProductName == null ||
      ProductCompany == null ||
      ProductCode == null
      
    ) {
      alert('Enter full details');
    }
    // if (!SelectedImages == Null || !LocationImages == Null) {
    //   alert('Please select images for both SelectedImages and LocationImages');
    //   return;
    // }
   
    
    

    try {
      // Wait for both image uploads to complete
      await uploadImagesToFirebase();
      await uploadImagesToFirebaseLocation();
  
      // Both image uploads are done at this point
      console.log('dd', imageUrls);
      console.log('aa', imageLocationUrls);
  
      // Now you can proceed with adding the data to Firestore
      await firestore().collection('Products').add({
        // ... (rest of the data)
        ProductCode: ProductCode,
        ProductName: ProductName,
        ProductCompany: ProductCompany,
        ProductQuantity: ProductQuantity,
        OriginalPrice: OriginalPrice,
        WholesalePrice: WholesalePrice,
        Description: Description,
        Location: Location,
        selectedType: selectedType,
        ProductImages: imageUrls,
        LocationImages: imageLocationUrls,
      });
  
      setIsLoading(false);
      alert('Product Added Successfully');
      navigation.navigate('Home');
    } catch (error) {
      setIsLoading(false);
      console.log('Error adding product:', error);
      // Handle any error that might occur during the process
    }
      

  

  }

  

  // var AddProduct = async () => {
  //   if (
  //     Description == null ||
  //     selectedType == null ||
  //     Location == null ||
  //     WholesalePrice == null ||
  //     OriginalPrice == null ||
  //     ProductQuantity == null ||
  //     ProductName == null ||
  //     ProductCompany == null ||
  //     ProductCode == null
  //   ) {
  //     alert('Enter full details');
  //   } else {
  //     try {
  //       setIsLoading(true);
  
  //       let selectedUrls = await Promise.all(
  //         SelectedImages.map(async (image, index) => {
  //           const response = await fetch(image);
  //           const blob = await response.blob();
  //           let imageName = `SelectedImages/${ProductCode}_${index}.jpg`;
  //           var ref = storage().ref(imageName);
  //           await ref.put(blob);
  
  //           return await ref.getDownloadURL();
  //         })
  //       );
  
  //       let locationUrls = await Promise.all(
  //         LocationImages.map(async (image, index) => {
  //           const response = await fetch(image);
  //           const blob = await response.blob();
  //           let imageName = `LocationImages/${ProductCode}_${index}.jpg`;
  //           var ref = storage().ref(imageName);
  //           await ref.put(blob);
  
  //           return await ref.getDownloadURL();
  //         })
  //       );
  // console.log(selectedUrls)
  // console.log(locationUrls)
  //       firestore()
  //         .collection('Products')
  //         .add({
  //           ProductCode: ProductCode,
  //           ProductName: ProductName,
  //           ProductCompany: ProductCompany,
  //           ProductQuantity: ProductQuantity,
  //           OriginalPrice: OriginalPrice,
  //           WholesalePrice: WholesalePrice,
  //           Description: Description,
  //           Location: Location,
  //           selectedType: selectedType,
  //           SelectedImages: selectedUrls,
  //           LocationImages: locationUrls,
  //         })
  //         .then(() => {
  //           alert('Product Added Successfully');
  //           navigation.navigate('Home');
  //         })
  //         .catch(() => {
  //           alert('Error');
  //         });
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // };



  // var AddProduct = async () => {
  //   if (
  //     Description == null ||
  //     selectedType == null ||
  //     Location == null ||
  //     WholesalePrice == null ||
  //     OriginalPrice == null ||
  //     ProductQuantity == null ||
  //     ProductName == null ||
  //     ProductCompany == null ||
  //     ProductCode == null
  //   ) {
  //     alert('Enter full details');
  //   } else {
  //     try {
  //       setIsLoading(true);
  
  //       let selectedUrls = await Promise.all(
  //         SelectedImages.map(async (image, index) => {
  //           const response = await fetch(image);
  //           const blob = await response.blob();
  //           let imageName = `SelectedImages/${ProductCode}_${index}.jpg`;
  //           var ref = storage().ref(imageName);
  //           await ref.put(blob);
  
  //           return await ref.getDownloadURL();
  //         })
  //       );
  
  //       let locationUrls = await Promise.all(
  //         LocationImages.map(async (image, index) => {
  //           const response = await fetch(image);
  //           const blob = await response.blob();
  //           let imageName = `LocationImages/${ProductCode}_${index}.jpg`;
  //           var ref = storage().ref(imageName);
  //           await ref.put(blob);
  
  //           return await ref.getDownloadURL();
  //         })
  //       );
  
  //       firestore()
  //         .collection('Products')
  //         .add({
  //           ProductCode: ProductCode,
  //           ProductName: ProductName,
  //           ProductCompany: ProductCompany,
  //           ProductQuantity: ProductQuantity,
  //           OriginalPrice: OriginalPrice,
  //           WholesalePrice: WholesalePrice,
  //           Description: Description,
  //           Location: Location,
  //           selectedType: selectedType,
  //           SelectedImages: selectedUrls,
  //           LocationImages: locationUrls,
  //         })
  //         .then(() => {
  //           alert('Product Added Successfully');
  //           navigation.navigate('Home');
  //         })
  //         .catch(() => {
  //           alert('Error');
  //         });
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // };

  

  // var AddProduct = async () => {
  //   // ... check null values
  
  //   try {
  //     setIsLoading(true);
  
  //     let selectedUrls = await Promise.all(
  //       SelectedImages.map(async (image, index) => {
  //         try {
  //           const response = await fetch(image);
  //           if (!response.ok) {
  //             throw new Error(`HTTP error! status: ${response.status}`);
  //           }
  //           const blob = await response.blob();
  //           let imageName = `SelectedImages/${ProductCode}_${index}.jpg`;
  //           var ref = storage().ref(imageName);
  //           await ref.put(blob);
  
  //           return await ref.getDownloadURL();
  //         } catch (error) {
  //           console.error('Error uploading selected image: ', error);
  //           return null;
  //         }
  //       })
  //     );
  
  //     let locationUrls = await Promise.all(
  //       LocationImages.map(async (image, index) => {
  //         try {
  //           const response = await fetch(image);
  //           if (!response.ok) {
  //             throw new Error(`HTTP error! status: ${response.status}`);
  //           }
  //           const blob = await response.blob();
  //           let imageName = `LocationImages/${ProductCode}_${index}.jpg`;
  //           var ref = storage().ref(imageName);
  //           await ref.put(blob);
  
  //           return await ref.getDownloadURL();
  //         } catch (error) {
  //           console.error('Error uploading location image: ', error);
  //           return null;
  //         }
  //       })
  //     );
  
  //     // ... firestore operation
  
  //   } catch (error) {
  //     console.error('Error in AddProduct: ', error);
  //   }
  // };

  // var AddProduct = async () => {
  //   if (
  //     Description == null ||
  //     selectedType == null ||
  //     Location == null ||
  //     WholesalePrice == null ||
  //     OriginalPrice == null ||
  //     ProductQuantity == null ||
  //     ProductName == null ||
  //     ProductCompany == null ||
  //     ProductCode == null
  //   ) {
  //     alert('Enter full details');
  //   } else {
  //     try {
  //       setIsLoading(true);
  
  //       let selectedUrls = await Promise.all(
  //         SelectedImages.map(async (image, index) => {
  //           try {
  //             const response = await fetch(image);
  //             const blob = await response.blob();
  //             let imageName = `SelectedImages/${ProductCode}_${index}.jpg`;
  //             var ref = storage().ref(imageName);
  //             await ref.put(blob);
    
  //             return await ref.getDownloadURL();
  //           } catch (error) {
  //             console.error('Error uploading image: ', error);
  //             return null;
  //           }
  //         })
  //       );
  
  //       let locationUrls = await Promise.all(
  //         LocationImages.map(async (image, index) => {
  //           try {
  //             const response = await fetch(image);
  //             const blob = await response.blob();
  //             let imageName = `LocationImages/${ProductCode}_${index}.jpg`;
  //             var ref = storage().ref(imageName);
  //             await ref.put(blob);
  
  //             return await ref.getDownloadURL();
  //           } catch (error) {
  //             console.error('Error uploading image: ', error);
  //             return null;
  //           }
  //         })
  //       );
  
  //       firestore()
  //         .collection('Products')
  //         .add({
  //           ProductCode: ProductCode,
  //           ProductName: ProductName,
  //           ProductCompany: ProductCompany,
  //           ProductQuantity: ProductQuantity,
  //           OriginalPrice: OriginalPrice,
  //           WholesalePrice: WholesalePrice,
  //           Description: Description,
  //           Location: Location,
  //           selectedType: selectedType,
  //           SelectedImages: selectedUrls.filter(url => url !== null),
  //           LocationImages: locationUrls.filter(url => url !== null),
  //         })
  //         .then(() => {
  //           alert('Product Added Successfully');
  //           navigation.navigate('Home');
  //         })
  //         .catch((error) => {
  //           console.error('Error adding product: ', error);
  //           alert('Error adding product');
  //         });
  //     } catch (error) {
  //       console.error('Error in AddProduct: ', error);
  //     }
  //   }
  // };
  return (
    <View style={{ backgroundColor: '#0f034b', height: '100%', position: 'absolute', width: '100%' }}>
      <Modal
        visible={modalVisible}
        // animationInTiming= '400'
        // animationType="slide"

        animationIn={'slideInLeft'}
        animationOut={'slideOutRight'}
        animationInTiming={2000}
        animationOutTiming={2000}
        // animationIn= "slideInUp"
        // animationOut="slideOutDown"
        transparent={true}
        onRequestClose={toggleModal}
        style={{ width: '100%', marginTop: 0, marginLeft: 0 }} >
        <TouchableOpacity
          style={styles.modalBackground}
          // activeOpacity={1}
          onPressOut={toggleModal}
        >
          <View style={styles.modalContainer}>
            <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>

              <View></View>
              <Image
                source={require('../Images/mainlogo.png')}
                style={{ height: 20, width: '30%', marginTop: '4%', marginLeft: '10%' }}
              />
              <View style={{ height: 35, width: 35, borderRadius: 20, borderColor: "gray", borderWidth: 0.5, marginTop: '2%', marginRight: '2%', justifyContent: 'center', alignItems: 'center' }}>
                <Image
                  source={require('../Images/close.png')}
                  style={{ height: '100%', width: '100%' }}
                />
              </View>

            </View>


            <View style={{ justifyContent: 'space-evenly', marginTop: '8%', flexDirection: 'row' }}>
              <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <TouchableOpacity style={{ height: 35, width: 35, borderRadius: 20, borderColor: "gray", borderWidth: 0.5, justifyContent: 'center', alignItems: 'center', marginBottom: '9%' }}>
                  <Image
                    source={require('../Images/home.png')}
                    style={{ height: '44%', width: '44%' }}
                  />

                </TouchableOpacity>
                <Text style={{ color: 'black', fontSize: 12 }}>Home</Text>
              </View>

              <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <TouchableOpacity style={{ height: 35, width: 35, borderRadius: 20, borderColor: "gray", borderWidth: 0.5, justifyContent: 'center', alignItems: 'center', marginBottom: '6%' }} onPress={handleToggleCheckbox}>
                  <View style={[styles.checkbox, isChecked ? styles.checked : null]}  >

                    <Image source={require("../Images/tick2.png")} style={{ height: '70%', width: '70%' }} />
                    {/* <Text>h</Text> */}
                  </View>
                </TouchableOpacity>
                <Text style={{ color: 'black', fontSize: 12 }}>DarkTheme</Text>
              </View>
              <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <TouchableOpacity style={{ height: 35, width: 35, borderRadius: 20, borderColor: "gray", borderWidth: 0.5, justifyContent: 'center', alignItems: 'center', marginBottom: '9%' }}>
                  <Image
                    source={require('../Images/profile.png')}
                    style={{ height: '44%', width: '44%' }}
                  />
                </TouchableOpacity>
                <Text style={{ color: 'black', fontSize: 12 }}>Profile</Text>
              </View>

              <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <TouchableOpacity style={{ height: 35, width: 35, borderRadius: 20, borderColor: "gray", borderWidth: 0.5, justifyContent: 'center', alignItems: 'center', marginBottom: '9%' }}
                  onPress={() => navigation.replace('Login')}>
                  <Image
                    source={require('../Images/logout.png')}
                    style={{ height: '44%', width: '44%' }}
                  />
                </TouchableOpacity>
                <Text style={{ color: 'black', fontSize: 12 }}>Logout</Text>
              </View>

            </View>

          </View>
        </TouchableOpacity>
      </Modal>

      {/*Header*/}
      <View style={{ flexDirection: 'row', marginTop: 16, marginBottom: 20, marginLeft: 12, justifyContent: 'space-between' }}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Icon name="arrow-back-ios" color="white" size={25} light />
        </TouchableOpacity>
        <View style={{}}>
          <Text style={{ color: "#ff5400", fontWeight: "bold", fontSize: 20, }}>Add Product</Text>
        </View>
        <View>
          <Text style={{ color: "#0f034b" }}>AAA</Text>
        </View>


      </View>
      <ScrollView>
        <View style={{ backgroundColor: "white", borderRadius: 20, justifyContent: 'center', padding: 12, width: "97%", alignSelf: "center", marginBottom: 10 }}>
          <Text style={{ fontSize: 15, marginLeft: 5, marginBottom: 10, color: '#ff5400', fontWeight: "bold" }}>Product Images</Text>
          <ScrollView horizontal style={{ paddingBottom: 10 }}>



            <View style={{ flexDirection: "row", alignItems: 'center', marginLeft: 4 }}>

              <TouchableOpacity style={{ width: 100, height: 100, backgroundColor: "#fbeee8", alignItems: 'center', borderStyle: 'dotted', borderColor: '#ff5400', borderWidth: 2, justifyContent: 'center', borderRadius: 14 }} onPress={handleOpenImagePicker}>
                <Text style={{ color: "#ff5400", fontWeight: "bold" }}>+ Select</Text>
                <Text style={{ color: "#ff5400", fontSize: 10 }}>(max 5 images)</Text>
              </TouchableOpacity>
              <FlatList

                data={SelectedImages}
                horizontal={true}
                renderItem={renderItem}
                keyExtractor={(_, index) => index.toString()}


              // numColumns={3}
              />
            </View>



            {/* image name quantity bought price wholesale price company description type Type product code location */}

          </ScrollView>
          <Text style={{ fontSize: 15, marginLeft: 5, color: '#ff5400', fontWeight: 'bold' }}>Product Name</Text>
          <View>
            <TextInput style={{
              height: 40, width: '97%',
              marginLeft: 5,
              // borderColor: 'gray',
              color: 'black',
              // borderWidth: 1,

              borderColor: '#ff5400',
              borderBottomWidth: 1,

            }}
              onChangeText={setProductName}
              value={ProductName}

              placeholder='Enter Product Name'
              placeholderTextColor='gray' />
          </View>
        </View>


        <View style={{ backgroundColor: "white", borderRadius: 20, padding: 12, width: "97%", alignSelf: "center", marginBottom: 10 }}>

          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
            <View style={{}}>
              <Text style={styles.main}>Product Original Price</Text>
              <View>
                <TextInput style={{
                  height: 40, width: 140,

                  // borderColor: 'gray',
                  color: 'black',
                  // borderWidth: 1,

                  borderColor: '#ff5400',
                  borderBottomWidth: 1,

                }}
                  onChangeText={setOriginalPrice}
                  value={OriginalPrice}
                  keyboardType="Numeric"
                  placeholder='Original Price'
                  placeholderTextColor='gray' />
              </View>


            </View>
            {/* image name quantity bought price wholesale price company description type Type product code location */}

            <View style={{}}>
              <Text style={styles.main}>Product Wholesale Price</Text>
              <View>
                <TextInput style={{
                  height: 40, width: 155,

                  // borderColor: 'gray',
                  color: 'black',
                  // borderWidth: 1,

                  borderColor: '#ff5400',
                  borderBottomWidth: 1,


                }}
                  onChangeText={setWholesalePrice}
                  value={WholesalePrice}
                  keyboardType="Numeric"
                  placeholder='Wholesale Price'
                  placeholderTextColor='gray' />
              </View>


            </View>


          </View>

          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
            <View style={{}}>
              <Text style={styles.main}>Product Quantity</Text>
              <View>
                <TextInput style={{
                  height: 40, width: 140,

                  // borderColor: 'gray',
                  color: 'black',
                  // borderWidth: 1,

                  borderColor: '#ff5400',
                  borderBottomWidth: 1,

                }}
                  onChangeText={setProductQuantity}
                  value={ProductQuantity}
                  keyboardType="Numeric"
                  placeholder='Quantity'
                  placeholderTextColor='gray' />
              </View>


            </View>
            {/* image name quantity bought price wholesale price company description type Type product code location */}

            <View style={{}}>
              <Text style={styles.main}>Product Company</Text>
              <View>
                <TextInput style={{
                  height: 40, width: 155,

                  // borderColor: 'gray',
                  color: 'black',
                  // borderWidth: 1,

                  borderColor: '#ff5400',
                  borderBottomWidth: 1,


                }}
                  placeholder='Company Name'
                  onChangeText={setProductCompany}
                  value={ProductCompany}
                  placeholderTextColor='gray' />
              </View>


            </View>


          </View>

          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
            <View style={{}}>
              <Text style={styles.main}>Product Type</Text>
              <TouchableOpacity
                style={{
                  width: 140,
                  height: 40,

                  borderColor: "#ff5400",
                  borderBottomWidth: 1,


                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  // paddingLeft: 15,
                  paddingRight: 15,
                }}
                onPress={() => {
                  setClicked(!clicked);
                }}>
                <Text style={{ color: 'black' }}>
                  {selectedType == '' ? 'Select Type' : selectedType}
                </Text>
                {clicked ? (
                  <Image
                    source={require('../Images/upload.png')}
                    style={{ width: 10, height: 10 }}
                  />
                ) : (
                  <Image
                    source={require('../Images/dropdown.png')}
                    style={{ width: 10, height: 10 }}
                  />
                )}
              </TouchableOpacity>
              {clicked ? (
                <View
                  style={{
                    elevation: 5,

                    // height: 300,
                    alignSelf: 'center',
                    width: '90%',
                    backgroundColor: 'white',
                    borderRadius: 10,
                    borderBottomWidth: 1
                  }}>
                  <TextInput
                    placeholder="Search"
                    placeholderTextColor='gray'
                    value={search}
                    ref={searchRef}
                    onChangeText={txt => {
                      onSearch(txt);
                      setSearch(txt);
                    }}
                    style={{
                      width: '100%',


                      borderBottomWidth: 0.2,
                      color: 'black',
                      borderColor: '#ff5400',
                      borderRadius: 7,
                      marginTop: 10,
                      paddingLeft: 20,
                    }}
                  />

                  <FlatList
                    data={data}
                    renderItem={({ item, index }) => {
                      return (
                        <TouchableOpacity
                          style={{
                            width: '85%',
                            alignSelf: 'center',
                            height: 30,
                            justifyContent: 'center',
                            // borderBottomWidth: 0.5,
                            borderColor: '#8e8e8e',
                          }}
                          onPress={() => {
                            setSelectedType(item.Type);
                            setClicked(!clicked);
                            onSearch('');
                            setSearch('');
                          }}>
                          <Text style={{ color: 'black' }}>{item.Type}</Text>
                        </TouchableOpacity>
                      );
                    }}
                  />
                </View>
              ) : null}




            </View>
            {/* image name quantity bought price wholesale price company description type Type product code location */}

            <View style={{}}>
              <Text style={styles.main}>Product Code</Text>
              <View>
                <TextInput style={{
                  height: 40, width: 155,

                  // borderColor: 'gray',
                  color: 'black',
                  // borderWidth: 1,

                  borderColor: '#ff5400',
                  borderBottomWidth: 1,


                }}
                  onChangeText={setProductCode}
                  value={ProductCode}
                  placeholder='Product code'
                  placeholderTextColor='gray' />
              </View>


            </View>


          </View>

          <View style={{ marginBottom: 10 }}>

            <Text style={styles.main}>Product Description</Text>

            <View style={{
              borderRadius: 5,

              marginTop: 5,
              width: '100%',
              height: 100,
              borderColor: '#ff5400',

              borderWidth: 0.2,

            }}>
              <TextInput
                style={{ color: 'black' }}
                placeholderTextColor="gray"

                onChangeText={setDescription}
                value={Description}
                placeholder="Provide brief description "

                multiline={true}

              />
            </View>
          </View>

          <View>

            <Text style={styles.main}>Product Location</Text>
            <View>
              <TextInput style={{
                height: 40, width: '100%',
                marginBottom: 5,
                // borderColor: 'gray',
                color: 'black',
                // borderWidth: 1,

                borderColor: '#ff5400',
                borderBottomWidth: 1,

              }}
                onChangeText={setLocation}
                value={Location}
                placeholder='Enter Location'
                placeholderTextColor='gray' />
            </View>


            <View style={{ flexDirection: "row", alignItems: 'center', marginLeft: 4 }}>

              <TouchableOpacity style={{ width: 100, height: 100, backgroundColor: "#fbeee8", alignItems: 'center', borderStyle: 'dotted', borderColor: '#ff5400', borderWidth: 2, justifyContent: 'center', borderRadius: 14 }} onPress={handlelocationimage}>
                <Text style={{ color: "#ff5400", fontWeight: "bold" }}>+ Select</Text>
                <Text style={{ color: "#ff5400", fontSize: 10 }}>(Location Image)</Text>
              </TouchableOpacity>
              <FlatList

                data={LocationImages}
                horizontal={true}
                renderItem={renderItem2}
                keyExtractor={(_, index) => index.toString()}


              // numColumns={3}
              />
            </View>



          </View>
          <TouchableOpacity
            style={{
              backgroundColor: '#ff5400',
              width: '30%',
              borderRadius: 39,
              height: 45,
              marginTop: 32,

              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center'

            }}
            onPress={AddProduct}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>Submit</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>


      <View style={{ height: 60, width: '99%', backgroundColor: 'white', alignSelf: 'center', justifyContent: 'center', borderTopStartRadius: 30, borderTopEndRadius: 30 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

          <TouchableOpacity style={styles.bottom} onPress={() => navigation.replace('Home')}>
            <Icon name="home" color="grey" size={30} light />
            <Text style={{ color: 'grey' }}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottom}>
            <Icon name="shopping-bag" color="#ff5400" size={30} light />
            <Text style={{ color: '#ff5400' }}>Add Products</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottom}>
            <Icon name="settings" color="grey" size={30} light />
            <Text style={{ color: 'grey' }}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottom}>

            <Icon name="admin-panel-settings" color="grey" size={30} light />

            <Text style={{ color: 'grey' }}>Profile</Text>
          </TouchableOpacity>
        </View >


        {/* <FontAwesomeIcon icon="fa-regular fa-font-awesome" size={30} color="#900"/> */}
        {/* <Icon name="fa-regular fa-basket-shopping" size={30} color="#900" /> */}

      </View>

    </View>

  );
};

export default AddProducts;
const styles = StyleSheet.create({
  container: {
    borderRadius: 10
    // backgroundColor: '#ff5400',
  },


  main: {
    // alignSelf: 'center',
    color: '#ff5400', fontWeight: 'bold'


  },
  checkboxContainer: {
    flexDirection: 'row',
    marginTop: 12,
    marginLeft: 10,
    alignItems: 'center',
  },
  bottom: {
    alignItems: 'center'
  },
  new: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center"
  },
  checkbox: {
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: 20,
    borderWidth: 2,
    borderColor: 'grey',
    borderRadius: 4,
    // marginRight: 10,
  },
  mediaThumbnail: {
    width: 100,
    height: 100,
    margin: 5,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  checked: {
    backgroundColor: 'white'
  },
  button: {
    // backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 40,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  mediaContainer: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 0,
  },
  mediaThumbnail: {
    width: 100,
    borderRadius: 14,
    height: 100,
    margin: 5,
  },
  removeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'red',
    // padding: 5,
    height: 15, width: 15,
    alignItems: 'center',
    justifyContent: "center",
    borderRadius: 5,
  },
  removeButtonText: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold'
  },
  imageThumbnail: {
    width: 100,
    height: 100,
    margin: 5,
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    // marginBottom: 20,
  },
  dropdownGender: {
    // backgroundColor: 'rgb(220,220, 220)',
    backgroundColor: "white",
    width: 150,



  },
  dropdown: {
    // borderColor: 'red',
    borderBottomWidth: 1,
    borderRadius: 7

  },
  button: {
    // backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 40,
  },

  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 10,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    // paddingHorizontal: 20,
    // paddingVertical: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    width: '100%',
    // height:180,
    borderRadius: 20,
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },

  modalContainer: {
    width: '100%',
    height: '24%',
    backgroundColor: '#fff',
    borderRadius: 20
  },
  modalText: {
    fontSize: 16,
    // marginBottom: 10,
  },
  closeButton: {
    // paddingHorizontal: 20,
    // paddingVertical: 10,
    backgroundColor: '#FF0000',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  checkbox: {
    height: 35, width: 35, borderRadius: 20, borderColor: "gray", borderWidth: 0.5, justifyContent: 'center', alignItems: 'center', marginBottom: '6%'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  checked: {
    backgroundColor: '#0079DE'
  },

});
