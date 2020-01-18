/**
 * @author Swaminathan Mathivanan <swami@netalytics.com>
 */
import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { BaseRequestService } from '../../../_services/base.service';
import { LoaderService } from 'src/app/_services/loader.service';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-houmregistration',
  templateUrl: './houmregistration.component.html',
  styleUrls: ['./houmregistration.component.scss']
})
export class HoumregistrationComponent implements OnInit {
  apigw = environment.apigw;
  constructor(readonly router: Router, private loaderService: LoaderService,
    private toastr: ToastrService, public baseService: BaseRequestService) {
    this.filterUpdate.pipe(
      debounceTime(1500),
      distinctUntilChanged())
      .subscribe(value => {
        this.doFilter(value);
      });
    this.getLocation();
  }
  usrSearchLoading = false;
  paidDomainIndex = 0;
  paidDomainSize = 20;
  showPaidDomainList = false;
  contactObj = new ContactInfo();
  detailsObj = new DetailsInfo();
  hide = true;
  selected = '';
  isMobileView = false;
  innerWidth: any;
  filterEmailUpdate = new Subject<string>();

  @ViewChild('firstName', { static: false }) firstName: ElementRef;
  @ViewChild('emailId', { static: false }) emailId: ElementRef;
  @ViewChild('country', { static: false }) country: ElementRef;

  countryList: any = [
    { name: 'Afghanistan', code: 'AF' },
    { name: 'Åland Islands', code: 'AX' },
    { name: 'Albania', code: 'AL' },
    { name: 'Algeria', code: 'DZ' },
    { name: 'American Samoa', code: 'AS' },
    { name: 'Andorra', code: 'AD' },
    { name: 'Angola', code: 'AO' },
    { name: 'Anguilla', code: 'AI' },
    { name: 'Antarctica', code: 'AQ' },
    { name: 'Antigua and Barbuda', code: 'AG' },
    { name: 'Argentina', code: 'AR' },
    { name: 'Armenia', code: 'AM' },
    { name: 'Aruba', code: 'AW' },
    { name: 'Australia', code: 'AU' },
    { name: 'Austria', code: 'AT' },
    { name: 'Azerbaijan', code: 'AZ' },
    { name: 'Bahamas', code: 'BS' },
    { name: 'Bahrain', code: 'BH' },
    { name: 'Bangladesh', code: 'BD' },
    { name: 'Barbados', code: 'BB' },
    { name: 'Belarus', code: 'BY' },
    { name: 'Belgium', code: 'BE' },
    { name: 'Belize', code: 'BZ' },
    { name: 'Benin', code: 'BJ' },
    { name: 'Bermuda', code: 'BM' },
    { name: 'Bhutan', code: 'BT' },
    { name: 'Bolivia', code: 'BO' },
    { name: 'Bosnia and Herzegovina', code: 'BA' },
    { name: 'Botswana', code: 'BW' },
    { name: 'Bouvet Island', code: 'BV' },
    { name: 'Brazil', code: 'BR' },
    { name: 'British Indian Ocean Territory', code: 'IO' },
    { name: 'Brunei Darussalam', code: 'BN' },
    { name: 'Bulgaria', code: 'BG' },
    { name: 'Burkina Faso', code: 'BF' },
    { name: 'Burundi', code: 'BI' },
    { name: 'Cambodia', code: 'KH' },
    { name: 'Cameroon', code: 'CM' },
    { name: 'Canada', code: 'CA' },
    { name: 'Cape Verde', code: 'CV' },
    { name: 'Cayman Islands', code: 'KY' },
    { name: 'Central African Republic', code: 'CF' },
    { name: 'Chad', code: 'TD' },
    { name: 'Chile', code: 'CL' },
    { name: 'China', code: 'CN' },
    { name: 'Christmas Island', code: 'CX' },
    { name: 'Cocos (Keeling) Islands', code: 'CC' },
    { name: 'Colombia', code: 'CO' },
    { name: 'Comoros', code: 'KM' },
    { name: 'Congo', code: 'CG' },
    { name: 'Congo, The Democratic Republic of the', code: 'CD' },
    { name: 'Cook Islands', code: 'CK' },
    { name: 'Costa Rica', code: 'CR' },
    { name: 'Cote D\'Ivoire', code: 'CI' },
    { name: 'Croatia', code: 'HR' },
    { name: 'Cuba', code: 'CU' },
    { name: 'Cyprus', code: 'CY' },
    { name: 'Czech Republic', code: 'CZ' },
    { name: 'Denmark', code: 'DK' },
    { name: 'Djibouti', code: 'DJ' },
    { name: 'Dominica', code: 'DM' },
    { name: 'Dominican Republic', code: 'DO' },
    { name: 'Ecuador', code: 'EC' },
    { name: 'Egypt', code: 'EG' },
    { name: 'El Salvador', code: 'SV' },
    { name: 'Equatorial Guinea', code: 'GQ' },
    { name: 'Eritrea', code: 'ER' },
    { name: 'Estonia', code: 'EE' },
    { name: 'Ethiopia', code: 'ET' },
    { name: 'Falkland Islands (Malvinas)', code: 'FK' },
    { name: 'Faroe Islands', code: 'FO' },
    { name: 'Fiji', code: 'FJ' },
    { name: 'Finland', code: 'FI' },
    { name: 'France', code: 'FR' },
    { name: 'French Guiana', code: 'GF' },
    { name: 'French Polynesia', code: 'PF' },
    { name: 'French Southern Territories', code: 'TF' },
    { name: 'Gabon', code: 'GA' },
    { name: 'Gambia', code: 'GM' },
    { name: 'Georgia', code: 'GE' },
    { name: 'Germany', code: 'DE' },
    { name: 'Ghana', code: 'GH' },
    { name: 'Gibraltar', code: 'GI' },
    { name: 'Greece', code: 'GR' },
    { name: 'Greenland', code: 'GL' },
    { name: 'Grenada', code: 'GD' },
    { name: 'Guadeloupe', code: 'GP' },
    { name: 'Guam', code: 'GU' },
    { name: 'Guatemala', code: 'GT' },
    { name: 'Guernsey', code: 'GG' },
    { name: 'Guinea', code: 'GN' },
    { name: 'Guinea-Bissau', code: 'GW' },
    { name: 'Guyana', code: 'GY' },
    { name: 'Haiti', code: 'HT' },
    { name: 'Heard Island and Mcdonald Islands', code: 'HM' },
    { name: 'Holy See (Vatican City State)', code: 'VA' },
    { name: 'Honduras', code: 'HN' },
    { name: 'Hong Kong', code: 'HK' },
    { name: 'Hungary', code: 'HU' },
    { name: 'Iceland', code: 'IS' },
    { name: 'India', code: 'IN' },
    { name: 'Indonesia', code: 'ID' },
    { name: 'Iran, Islamic Republic Of', code: 'IR' },
    { name: 'Iraq', code: 'IQ' },
    { name: 'Ireland', code: 'IE' },
    { name: 'Isle of Man', code: 'IM' },
    { name: 'Israel', code: 'IL' },
    { name: 'Italy', code: 'IT' },
    { name: 'Jamaica', code: 'JM' },
    { name: 'Japan', code: 'JP' },
    { name: 'Jersey', code: 'JE' },
    { name: 'Jordan', code: 'JO' },
    { name: 'Kazakhstan', code: 'KZ' },
    { name: 'Kenya', code: 'KE' },
    { name: 'Kiribati', code: 'KI' },
    { name: 'Korea, Democratic People\'S Republic of', code: 'KP' },
    { name: 'Korea, Republic of', code: 'KR' },
    { name: 'Kuwait', code: 'KW' },
    { name: 'Kyrgyzstan', code: 'KG' },
    { name: 'Lao People\'S Democratic Republic', code: 'LA' },
    { name: 'Latvia', code: 'LV' },
    { name: 'Lebanon', code: 'LB' },
    { name: 'Lesotho', code: 'LS' },
    { name: 'Liberia', code: 'LR' },
    { name: 'Libyan Arab Jamahiriya', code: 'LY' },
    { name: 'Liechtenstein', code: 'LI' },
    { name: 'Lithuania', code: 'LT' },
    { name: 'Luxembourg', code: 'LU' },
    { name: 'Macao', code: 'MO' },
    { name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK' },
    { name: 'Madagascar', code: 'MG' },
    { name: 'Malawi', code: 'MW' },
    { name: 'Malaysia', code: 'MY' },
    { name: 'Maldives', code: 'MV' },
    { name: 'Mali', code: 'ML' },
    { name: 'Malta', code: 'MT' },
    { name: 'Marshall Islands', code: 'MH' },
    { name: 'Martinique', code: 'MQ' },
    { name: 'Mauritania', code: 'MR' },
    { name: 'Mauritius', code: 'MU' },
    { name: 'Mayotte', code: 'YT' },
    { name: 'Mexico', code: 'MX' },
    { name: 'Micronesia, Federated States of', code: 'FM' },
    { name: 'Moldova, Republic of', code: 'MD' },
    { name: 'Monaco', code: 'MC' },
    { name: 'Mongolia', code: 'MN' },
    { name: 'Montserrat', code: 'MS' },
    { name: 'Morocco', code: 'MA' },
    { name: 'Mozambique', code: 'MZ' },
    { name: 'Myanmar', code: 'MM' },
    { name: 'Namibia', code: 'NA' },
    { name: 'Nauru', code: 'NR' },
    { name: 'Nepal', code: 'NP' },
    { name: 'Netherlands', code: 'NL' },
    { name: 'Netherlands Antilles', code: 'AN' },
    { name: 'New Caledonia', code: 'NC' },
    { name: 'New Zealand', code: 'NZ' },
    { name: 'Nicaragua', code: 'NI' },
    { name: 'Niger', code: 'NE' },
    { name: 'Nigeria', code: 'NG' },
    { name: 'Niue', code: 'NU' },
    { name: 'Norfolk Island', code: 'NF' },
    { name: 'Northern Mariana Islands', code: 'MP' },
    { name: 'Norway', code: 'NO' },
    { name: 'Oman', code: 'OM' },
    { name: 'Pakistan', code: 'PK' },
    { name: 'Palau', code: 'PW' },
    { name: 'Palestinian Territory, Occupied', code: 'PS' },
    { name: 'Panama', code: 'PA' },
    { name: 'Papua New Guinea', code: 'PG' },
    { name: 'Paraguay', code: 'PY' },
    { name: 'Peru', code: 'PE' },
    { name: 'Philippines', code: 'PH' },
    { name: 'Pitcairn', code: 'PN' },
    { name: 'Poland', code: 'PL' },
    { name: 'Portugal', code: 'PT' },
    { name: 'Puerto Rico', code: 'PR' },
    { name: 'Qatar', code: 'QA' },
    { name: 'Reunion', code: 'RE' },
    { name: 'Romania', code: 'RO' },
    { name: 'Russian Federation', code: 'RU' },
    { name: 'RWANDA', code: 'RW' },
    { name: 'Saint Helena', code: 'SH' },
    { name: 'Saint Kitts and Nevis', code: 'KN' },
    { name: 'Saint Lucia', code: 'LC' },
    { name: 'Saint Pierre and Miquelon', code: 'PM' },
    { name: 'Saint Vincent and the Grenadines', code: 'VC' },
    { name: 'Samoa', code: 'WS' },
    { name: 'San Marino', code: 'SM' },
    { name: 'Sao Tome and Principe', code: 'ST' },
    { name: 'Saudi Arabia', code: 'SA' },
    { name: 'Senegal', code: 'SN' },
    { name: 'Serbia and Montenegro', code: 'CS' },
    { name: 'Seychelles', code: 'SC' },
    { name: 'Sierra Leone', code: 'SL' },
    { name: 'Singapore', code: 'SG' },
    { name: 'Slovakia', code: 'SK' },
    { name: 'Slovenia', code: 'SI' },
    { name: 'Solomon Islands', code: 'SB' },
    { name: 'Somalia', code: 'SO' },
    { name: 'South Africa', code: 'ZA' },
    { name: 'South Georgia and the South Sandwich Islands', code: 'GS' },
    { name: 'Spain', code: 'ES' },
    { name: 'Sri Lanka', code: 'LK' },
    { name: 'Sudan', code: 'SD' },
    { name: 'Suriname', code: 'SR' },
    { name: 'Svalbard and Jan Mayen', code: 'SJ' },
    { name: 'Swaziland', code: 'SZ' },
    { name: 'Sweden', code: 'SE' },
    { name: 'Switzerland', code: 'CH' },
    { name: 'Syrian Arab Republic', code: 'SY' },
    { name: 'Taiwan, Province of China', code: 'TW' },
    { name: 'Tajikistan', code: 'TJ' },
    { name: 'Tanzania, United Republic of', code: 'TZ' },
    { name: 'Thailand', code: 'TH' },
    { name: 'Timor-Leste', code: 'TL' },
    { name: 'Togo', code: 'TG' },
    { name: 'Tokelau', code: 'TK' },
    { name: 'Tonga', code: 'TO' },
    { name: 'Trinidad and Tobago', code: 'TT' },
    { name: 'Tunisia', code: 'TN' },
    { name: 'Turkey', code: 'TR' },
    { name: 'Turkmenistan', code: 'TM' },
    { name: 'Turks and Caicos Islands', code: 'TC' },
    { name: 'Tuvalu', code: 'TV' },
    { name: 'Uganda', code: 'UG' },
    { name: 'Ukraine', code: 'UA' },
    { name: 'United Arab Emirates', code: 'AE' },
    { name: 'United Kingdom', code: 'GB' },
    { name: 'United States', code: 'US' },
    { name: 'United States Minor Outlying Islands', code: 'UM' },
    { name: 'Uruguay', code: 'UY' },
    { name: 'Uzbekistan', code: 'UZ' },
    { name: 'Vanuatu', code: 'VU' },
    { name: 'Venezuela', code: 'VE' },
    { name: 'Viet Nam', code: 'VN' },
    { name: 'Virgin Islands, British', code: 'VG' },
    { name: 'Virgin Islands, U.S.', code: 'VI' },
    { name: 'Wallis and Futuna', code: 'WF' },
    { name: 'Western Sahara', code: 'EH' },
    { name: 'Yemen', code: 'YE' },
    { name: 'Zambia', code: 'ZM' },
    { name: 'Zimbabwe', code: 'ZW' }
  ];

  countryCodes: any = [
    {
      name: 'Afghanistan',
      dial_code: '+93',
      code: 'AF'
    },
    {
      name: 'Aland Islands',
      dial_code: '+358',
      code: 'AX'
    },
    {
      name: 'Albania',
      dial_code: '+355',
      code: 'AL'
    },
    {
      name: 'Algeria',
      dial_code: '+213',
      code: 'DZ'
    },
    {
      name: 'AmericanSamoa',
      dial_code: '+1684',
      code: 'AS'
    },
    {
      name: 'Andorra',
      dial_code: '+376',
      code: 'AD'
    },
    {
      name: 'Angola',
      dial_code: '+244',
      code: 'AO'
    },
    {
      name: 'Anguilla',
      dial_code: '+1264',
      code: 'AI'
    },
    {
      name: 'Antarctica',
      dial_code: '+672',
      code: 'AQ'
    },
    {
      name: 'Antigua and Barbuda',
      dial_code: '+1268',
      code: 'AG'
    },
    {
      name: 'Argentina',
      dial_code: '+54',
      code: 'AR'
    },
    {
      name: 'Armenia',
      dial_code: '+374',
      code: 'AM'
    },
    {
      name: 'Aruba',
      dial_code: '+297',
      code: 'AW'
    },
    {
      name: 'Australia',
      dial_code: '+61',
      code: 'AU'
    },
    {
      name: 'Austria',
      dial_code: '+43',
      code: 'AT'
    },
    {
      name: 'Azerbaijan',
      dial_code: '+994',
      code: 'AZ'
    },
    {
      name: 'Bahamas',
      dial_code: '+1242',
      code: 'BS'
    },
    {
      name: 'Bahrain',
      dial_code: '+973',
      code: 'BH'
    },
    {
      name: 'Bangladesh',
      dial_code: '+880',
      code: 'BD'
    },
    {
      name: 'Barbados',
      dial_code: '+1246',
      code: 'BB'
    },
    {
      name: 'Belarus',
      dial_code: '+375',
      code: 'BY'
    },
    {
      name: 'Belgium',
      dial_code: '+32',
      code: 'BE'
    },
    {
      name: 'Belize',
      dial_code: '+501',
      code: 'BZ'
    },
    {
      name: 'Benin',
      dial_code: '+229',
      code: 'BJ'
    },
    {
      name: 'Bermuda',
      dial_code: '+1441',
      code: 'BM'
    },
    {
      name: 'Bhutan',
      dial_code: '+975',
      code: 'BT'
    },
    {
      name: 'Bolivia, Plurinational State of',
      dial_code: '+591',
      code: 'BO'
    },
    {
      name: 'Bosnia and Herzegovina',
      dial_code: '+387',
      code: 'BA'
    },
    {
      name: 'Botswana',
      dial_code: '+267',
      code: 'BW'
    },
    {
      name: 'Brazil',
      dial_code: '+55',
      code: 'BR'
    },
    {
      name: 'British Indian Ocean Territory',
      dial_code: '+246',
      code: 'IO'
    },
    {
      name: 'Brunei Darussalam',
      dial_code: '+673',
      code: 'BN'
    },
    {
      name: 'Bulgaria',
      dial_code: '+359',
      code: 'BG'
    },
    {
      name: 'Burkina Faso',
      dial_code: '+226',
      code: 'BF'
    },
    {
      name: 'Burundi',
      dial_code: '+257',
      code: 'BI'
    },
    {
      name: 'Cambodia',
      dial_code: '+855',
      code: 'KH'
    },
    {
      name: 'Cameroon',
      dial_code: '+237',
      code: 'CM'
    },
    {
      name: 'Canada',
      dial_code: '+1',
      code: 'CA'
    },
    {
      name: 'Cape Verde',
      dial_code: '+238',
      code: 'CV'
    },
    {
      name: 'Cayman Islands',
      dial_code: '+ 345',
      code: 'KY'
    },
    {
      name: 'Central African Republic',
      dial_code: '+236',
      code: 'CF'
    },
    {
      name: 'Chad',
      dial_code: '+235',
      code: 'TD'
    },
    {
      name: 'Chile',
      dial_code: '+56',
      code: 'CL'
    },
    {
      name: 'China',
      dial_code: '+86',
      code: 'CN'
    },
    {
      name: 'Christmas Island',
      dial_code: '+61',
      code: 'CX'
    },
    {
      name: 'Cocos (Keeling) Islands',
      dial_code: '+61',
      code: 'CC'
    },
    {
      name: 'Colombia',
      dial_code: '+57',
      code: 'CO'
    },
    {
      name: 'Comoros',
      dial_code: '+269',
      code: 'KM'
    },
    {
      name: 'Congo',
      dial_code: '+242',
      code: 'CG'
    },
    {
      name: 'Congo, The Democratic Republic of the Congo',
      dial_code: '+243',
      code: 'CD'
    },
    {
      name: 'Cook Islands',
      dial_code: '+682',
      code: 'CK'
    },
    {
      name: 'Costa Rica',
      dial_code: '+506',
      code: 'CR'
    },
    {
      name: 'Cote d\'Ivoire',
      dial_code: '+225',
      code: 'CI'
    },
    {
      name: 'Croatia',
      dial_code: '+385',
      code: 'HR'
    },
    {
      name: 'Cuba',
      dial_code: '+53',
      code: 'CU'
    },
    {
      name: 'Cyprus',
      dial_code: '+357',
      code: 'CY'
    },
    {
      name: 'Czech Republic',
      dial_code: '+420',
      code: 'CZ'
    },
    {
      name: 'Denmark',
      dial_code: '+45',
      code: 'DK'
    },
    {
      name: 'Djibouti',
      dial_code: '+253',
      code: 'DJ'
    },
    {
      name: 'Dominica',
      dial_code: '+1767',
      code: 'DM'
    },
    {
      name: 'Dominican Republic',
      dial_code: '+1849',
      code: 'DO'
    },
    {
      name: 'Ecuador',
      dial_code: '+593',
      code: 'EC'
    },
    {
      name: 'Egypt',
      dial_code: '+20',
      code: 'EG'
    },
    {
      name: 'El Salvador',
      dial_code: '+503',
      code: 'SV'
    },
    {
      name: 'Equatorial Guinea',
      dial_code: '+240',
      code: 'GQ'
    },
    {
      name: 'Eritrea',
      dial_code: '+291',
      code: 'ER'
    },
    {
      name: 'Estonia',
      dial_code: '+372',
      code: 'EE'
    },
    {
      name: 'Ethiopia',
      dial_code: '+251',
      code: 'ET'
    },
    {
      name: 'Falkland Islands (Malvinas)',
      dial_code: '+500',
      code: 'FK'
    },
    {
      name: 'Faroe Islands',
      dial_code: '+298',
      code: 'FO'
    },
    {
      name: 'Fiji',
      dial_code: '+679',
      code: 'FJ'
    },
    {
      name: 'Finland',
      dial_code: '+358',
      code: 'FI'
    },
    {
      name: 'France',
      dial_code: '+33',
      code: 'FR'
    },
    {
      name: 'French Guiana',
      dial_code: '+594',
      code: 'GF'
    },
    {
      name: 'French Polynesia',
      dial_code: '+689',
      code: 'PF'
    },
    {
      name: 'Gabon',
      dial_code: '+241',
      code: 'GA'
    },
    {
      name: 'Gambia',
      dial_code: '+220',
      code: 'GM'
    },
    {
      name: 'Georgia',
      dial_code: '+995',
      code: 'GE'
    },
    {
      name: 'Germany',
      dial_code: '+49',
      code: 'DE'
    },
    {
      name: 'Ghana',
      dial_code: '+233',
      code: 'GH'
    },
    {
      name: 'Gibraltar',
      dial_code: '+350',
      code: 'GI'
    },
    {
      name: 'Greece',
      dial_code: '+30',
      code: 'GR'
    },
    {
      name: 'Greenland',
      dial_code: '+299',
      code: 'GL'
    },
    {
      name: 'Grenada',
      dial_code: '+1473',
      code: 'GD'
    },
    {
      name: 'Guadeloupe',
      dial_code: '+590',
      code: 'GP'
    },
    {
      name: 'Guam',
      dial_code: '+1671',
      code: 'GU'
    },
    {
      name: 'Guatemala',
      dial_code: '+502',
      code: 'GT'
    },
    {
      name: 'Guernsey',
      dial_code: '+44',
      code: 'GG'
    },
    {
      name: 'Guinea',
      dial_code: '+224',
      code: 'GN'
    },
    {
      name: 'Guinea-Bissau',
      dial_code: '+245',
      code: 'GW'
    },
    {
      name: 'Guyana',
      dial_code: '+595',
      code: 'GY'
    },
    {
      name: 'Haiti',
      dial_code: '+509',
      code: 'HT'
    },
    {
      name: 'Holy See (Vatican City State)',
      dial_code: '+379',
      code: 'VA'
    },
    {
      name: 'Honduras',
      dial_code: '+504',
      code: 'HN'
    },
    {
      name: 'Hong Kong',
      dial_code: '+852',
      code: 'HK'
    },
    {
      name: 'Hungary',
      dial_code: '+36',
      code: 'HU'
    },
    {
      name: 'Iceland',
      dial_code: '+354',
      code: 'IS'
    },
    {
      name: 'India',
      dial_code: '+91',
      code: 'IN'
    },
    {
      name: 'Indonesia',
      dial_code: '+62',
      code: 'ID'
    },
    {
      name: 'Iran, Islamic Republic of Persian Gulf',
      dial_code: '+98',
      code: 'IR'
    },
    {
      name: 'Iraq',
      dial_code: '+964',
      code: 'IQ'
    },
    {
      name: 'Ireland',
      dial_code: '+353',
      code: 'IE'
    },
    {
      name: 'Isle of Man',
      dial_code: '+44',
      code: 'IM'
    },
    {
      name: 'Israel',
      dial_code: '+972',
      code: 'IL'
    },
    {
      name: 'Italy',
      dial_code: '+39',
      code: 'IT'
    },
    {
      name: 'Jamaica',
      dial_code: '+1876',
      code: 'JM'
    },
    {
      name: 'Japan',
      dial_code: '+81',
      code: 'JP'
    },
    {
      name: 'Jersey',
      dial_code: '+44',
      code: 'JE'
    },
    {
      name: 'Jordan',
      dial_code: '+962',
      code: 'JO'
    },
    {
      name: 'Kazakhstan',
      dial_code: '+77',
      code: 'KZ'
    },
    {
      name: 'Kenya',
      dial_code: '+254',
      code: 'KE'
    },
    {
      name: 'Kiribati',
      dial_code: '+686',
      code: 'KI'
    },
    {
      name: 'Korea, Democratic People\'s Republic of Korea',
      dial_code: '+850',
      code: 'KP'
    },
    {
      name: 'Korea, Republic of South Korea',
      dial_code: '+82',
      code: 'KR'
    },
    {
      name: 'Kuwait',
      dial_code: '+965',
      code: 'KW'
    },
    {
      name: 'Kyrgyzstan',
      dial_code: '+996',
      code: 'KG'
    },
    {
      name: 'Laos',
      dial_code: '+856',
      code: 'LA'
    },
    {
      name: 'Latvia',
      dial_code: '+371',
      code: 'LV'
    },
    {
      name: 'Lebanon',
      dial_code: '+961',
      code: 'LB'
    },
    {
      name: 'Lesotho',
      dial_code: '+266',
      code: 'LS'
    },
    {
      name: 'Liberia',
      dial_code: '+231',
      code: 'LR'
    },
    {
      name: 'Libyan Arab Jamahiriya',
      dial_code: '+218',
      code: 'LY'
    },
    {
      name: 'Liechtenstein',
      dial_code: '+423',
      code: 'LI'
    },
    {
      name: 'Lithuania',
      dial_code: '+370',
      code: 'LT'
    },
    {
      name: 'Luxembourg',
      dial_code: '+352',
      code: 'LU'
    },
    {
      name: 'Macao',
      dial_code: '+853',
      code: 'MO'
    },
    {
      name: 'Macedonia',
      dial_code: '+389',
      code: 'MK'
    },
    {
      name: 'Madagascar',
      dial_code: '+261',
      code: 'MG'
    },
    {
      name: 'Malawi',
      dial_code: '+265',
      code: 'MW'
    },
    {
      name: 'Malaysia',
      dial_code: '+60',
      code: 'MY'
    },
    {
      name: 'Maldives',
      dial_code: '+960',
      code: 'MV'
    },
    {
      name: 'Mali',
      dial_code: '+223',
      code: 'ML'
    },
    {
      name: 'Malta',
      dial_code: '+356',
      code: 'MT'
    },
    {
      name: 'Marshall Islands',
      dial_code: '+692',
      code: 'MH'
    },
    {
      name: 'Martinique',
      dial_code: '+596',
      code: 'MQ'
    },
    {
      name: 'Mauritania',
      dial_code: '+222',
      code: 'MR'
    },
    {
      name: 'Mauritius',
      dial_code: '+230',
      code: 'MU'
    },
    {
      name: 'Mayotte',
      dial_code: '+262',
      code: 'YT'
    },
    {
      name: 'Mexico',
      dial_code: '+52',
      code: 'MX'
    },
    {
      name: 'Micronesia, Federated States of Micronesia',
      dial_code: '+691',
      code: 'FM'
    },
    {
      name: 'Moldova',
      dial_code: '+373',
      code: 'MD'
    },
    {
      name: 'Monaco',
      dial_code: '+377',
      code: 'MC'
    },
    {
      name: 'Mongolia',
      dial_code: '+976',
      code: 'MN'
    },
    {
      name: 'Montenegro',
      dial_code: '+382',
      code: 'ME'
    },
    {
      name: 'Montserrat',
      dial_code: '+1664',
      code: 'MS'
    },
    {
      name: 'Morocco',
      dial_code: '+212',
      code: 'MA'
    },
    {
      name: 'Mozambique',
      dial_code: '+258',
      code: 'MZ'
    },
    {
      name: 'Myanmar',
      dial_code: '+95',
      code: 'MM'
    },
    {
      name: 'Namibia',
      dial_code: '+264',
      code: 'NA'
    },
    {
      name: 'Nauru',
      dial_code: '+674',
      code: 'NR'
    },
    {
      name: 'Nepal',
      dial_code: '+977',
      code: 'NP'
    },
    {
      name: 'Netherlands',
      dial_code: '+31',
      code: 'NL'
    },
    {
      name: 'Netherlands Antilles',
      dial_code: '+599',
      code: 'AN'
    },
    {
      name: 'New Caledonia',
      dial_code: '+687',
      code: 'NC'
    },
    {
      name: 'New Zealand',
      dial_code: '+64',
      code: 'NZ'
    },
    {
      name: 'Nicaragua',
      dial_code: '+505',
      code: 'NI'
    },
    {
      name: 'Niger',
      dial_code: '+227',
      code: 'NE'
    },
    {
      name: 'Nigeria',
      dial_code: '+234',
      code: 'NG'
    },
    {
      name: 'Niue',
      dial_code: '+683',
      code: 'NU'
    },
    {
      name: 'Norfolk Island',
      dial_code: '+672',
      code: 'NF'
    },
    {
      name: 'Northern Mariana Islands',
      dial_code: '+1670',
      code: 'MP'
    },
    {
      name: 'Norway',
      dial_code: '+47',
      code: 'NO'
    },
    {
      name: 'Oman',
      dial_code: '+968',
      code: 'OM'
    },
    {
      name: 'Pakistan',
      dial_code: '+92',
      code: 'PK'
    },
    {
      name: 'Palau',
      dial_code: '+680',
      code: 'PW'
    },
    {
      name: 'Palestinian Territory, Occupied',
      dial_code: '+970',
      code: 'PS'
    },
    {
      name: 'Panama',
      dial_code: '+507',
      code: 'PA'
    },
    {
      name: 'Papua New Guinea',
      dial_code: '+675',
      code: 'PG'
    },
    {
      name: 'Paraguay',
      dial_code: '+595',
      code: 'PY'
    },
    {
      name: 'Peru',
      dial_code: '+51',
      code: 'PE'
    },
    {
      name: 'Philippines',
      dial_code: '+63',
      code: 'PH'
    },
    {
      name: 'Pitcairn',
      dial_code: '+872',
      code: 'PN'
    },
    {
      name: 'Poland',
      dial_code: '+48',
      code: 'PL'
    },
    {
      name: 'Portugal',
      dial_code: '+351',
      code: 'PT'
    },
    {
      name: 'Puerto Rico',
      dial_code: '+1939',
      code: 'PR'
    },
    {
      name: 'Qatar',
      dial_code: '+974',
      code: 'QA'
    },
    {
      name: 'Romania',
      dial_code: '+40',
      code: 'RO'
    },
    {
      name: 'Russia',
      dial_code: '+7',
      code: 'RU'
    },
    {
      name: 'Rwanda',
      dial_code: '+250',
      code: 'RW'
    },
    {
      name: 'Reunion',
      dial_code: '+262',
      code: 'RE'
    },
    {
      name: 'Saint Barthelemy',
      dial_code: '+590',
      code: 'BL'
    },
    {
      name: 'Saint Helena, Ascension and Tristan Da Cunha',
      dial_code: '+290',
      code: 'SH'
    },
    {
      name: 'Saint Kitts and Nevis',
      dial_code: '+1869',
      code: 'KN'
    },
    {
      name: 'Saint Lucia',
      dial_code: '+1758',
      code: 'LC'
    },
    {
      name: 'Saint Martin',
      dial_code: '+590',
      code: 'MF'
    },
    {
      name: 'Saint Pierre and Miquelon',
      dial_code: '+508',
      code: 'PM'
    },
    {
      name: 'Saint Vincent and the Grenadines',
      dial_code: '+1784',
      code: 'VC'
    },
    {
      name: 'Samoa',
      dial_code: '+685',
      code: 'WS'
    },
    {
      name: 'San Marino',
      dial_code: '+378',
      code: 'SM'
    },
    {
      name: 'Sao Tome and Principe',
      dial_code: '+239',
      code: 'ST'
    },
    {
      name: 'Saudi Arabia',
      dial_code: '+966',
      code: 'SA'
    },
    {
      name: 'Senegal',
      dial_code: '+221',
      code: 'SN'
    },
    {
      name: 'Serbia',
      dial_code: '+381',
      code: 'RS'
    },
    {
      name: 'Seychelles',
      dial_code: '+248',
      code: 'SC'
    },
    {
      name: 'Sierra Leone',
      dial_code: '+232',
      code: 'SL'
    },
    {
      name: 'Singapore',
      dial_code: '+65',
      code: 'SG'
    },
    {
      name: 'Slovakia',
      dial_code: '+421',
      code: 'SK'
    },
    {
      name: 'Slovenia',
      dial_code: '+386',
      code: 'SI'
    },
    {
      name: 'Solomon Islands',
      dial_code: '+677',
      code: 'SB'
    },
    {
      name: 'Somalia',
      dial_code: '+252',
      code: 'SO'
    },
    {
      name: 'South Africa',
      dial_code: '+27',
      code: 'ZA'
    },
    {
      name: 'South Sudan',
      dial_code: '+211',
      code: 'SS'
    },
    {
      name: 'South Georgia and the South Sandwich Islands',
      dial_code: '+500',
      code: 'GS'
    },
    {
      name: 'Spain',
      dial_code: '+34',
      code: 'ES'
    },
    {
      name: 'Sri Lanka',
      dial_code: '+94',
      code: 'LK'
    },
    {
      name: 'Sudan',
      dial_code: '+249',
      code: 'SD'
    },
    {
      name: 'Suriname',
      dial_code: '+597',
      code: 'SR'
    },
    {
      name: 'Svalbard and Jan Mayen',
      dial_code: '+47',
      code: 'SJ'
    },
    {
      name: 'Swaziland',
      dial_code: '+268',
      code: 'SZ'
    },
    {
      name: 'Sweden',
      dial_code: '+46',
      code: 'SE'
    },
    {
      name: 'Switzerland',
      dial_code: '+41',
      code: 'CH'
    },
    {
      name: 'Syrian Arab Republic',
      dial_code: '+963',
      code: 'SY'
    },
    {
      name: 'Taiwan',
      dial_code: '+886',
      code: 'TW'
    },
    {
      name: 'Tajikistan',
      dial_code: '+992',
      code: 'TJ'
    },
    {
      name: 'Tanzania, United Republic of Tanzania',
      dial_code: '+255',
      code: 'TZ'
    },
    {
      name: 'Thailand',
      dial_code: '+66',
      code: 'TH'
    },
    {
      name: 'Timor-Leste',
      dial_code: '+670',
      code: 'TL'
    },
    {
      name: 'Togo',
      dial_code: '+228',
      code: 'TG'
    },
    {
      name: 'Tokelau',
      dial_code: '+690',
      code: 'TK'
    },
    {
      name: 'Tonga',
      dial_code: '+676',
      code: 'TO'
    },
    {
      name: 'Trinidad and Tobago',
      dial_code: '+1868',
      code: 'TT'
    },
    {
      name: 'Tunisia',
      dial_code: '+216',
      code: 'TN'
    },
    {
      name: 'Turkey',
      dial_code: '+90',
      code: 'TR'
    },
    {
      name: 'Turkmenistan',
      dial_code: '+993',
      code: 'TM'
    },
    {
      name: 'Turks and Caicos Islands',
      dial_code: '+1649',
      code: 'TC'
    },
    {
      name: 'Tuvalu',
      dial_code: '+688',
      code: 'TV'
    },
    {
      name: 'Uganda',
      dial_code: '+256',
      code: 'UG'
    },
    {
      name: 'Ukraine',
      dial_code: '+380',
      code: 'UA'
    },
    {
      name: 'United Arab Emirates',
      dial_code: '+971',
      code: 'AE'
    },
    {
      name: 'United Kingdom',
      dial_code: '+44',
      code: 'GB'
    },
    {
      name: 'United States',
      dial_code: '+1',
      code: 'US'
    },
    {
      name: 'Uruguay',
      dial_code: '+598',
      code: 'UY'
    },
    {
      name: 'Uzbekistan',
      dial_code: '+998',
      code: 'UZ'
    },
    {
      name: 'Vanuatu',
      dial_code: '+678',
      code: 'VU'
    },
    {
      name: 'Venezuela, Bolivarian Republic of Venezuela',
      dial_code: '+58',
      code: 'VE'
    },
    {
      name: 'Vietnam',
      dial_code: '+84',
      code: 'VN'
    },
    {
      name: 'Virgin Islands, British',
      dial_code: '+1284',
      code: 'VG'
    },
    {
      name: 'Virgin Islands, U.S.',
      dial_code: '+1340',
      code: 'VI'
    },
    {
      name: 'Wallis and Futuna',
      dial_code: '+681',
      code: 'WF'
    },
    {
      name: 'Yemen',
      dial_code: '+967',
      code: 'YE'
    },
    {
      name: 'Zambia',
      dial_code: '+260',
      code: 'ZM'
    },
    {
      name: 'Zimbabwe',
      dial_code: '+263',
      code: 'ZW'
    }
  ];

  domainsPaidList: any = [];
  domainsList: any;
  freeDoaminList: any;
  houmInfo: any;
  paymentVals: any = [];
  filterText = '';
  searchResult: any;
  holdSearch = false;
  showDomainPage = false;
  showloadingdomainsPage = false;
  showloadingdomains = false;
  showProfilePage = true;
  showDetailsPage = false;
  enableprofileTick = false;
  enabledomainTick = false;
  isTextFieldType = true;
  isSortType = true;
  isReTextFieldType = true;
  showPaidList = false;
  paidList: any;
  showNoDomainText = false;
  showButtonText = 'SHOW MORE OPTIONS';
  buildFreebutton: any;
  buildPaidbutton: any;

  icon: any = 'fa fa-eye-slash';
  icon1: any = 'fa fa-eye-slash';
  sortarrow: any = 'fa fa-angle-down';
  filterUpdate = new Subject<string>();
  enableButton = false;
  emailErrorMsg = '';
  countryErrorMsg = '';
  EmailID_REGX = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  invalidEmail = false;
  firstErrorMsg = '';
  tabValue: any;
  loaderenable = false;
  freedata: any;
  paiddata: any;
  showfreeloader = false;
  showpaidloader = false;
  showregpage = false;
  showmainpage = true;
  showdompage = false;
  countryListSupport = [];

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobileView = false;
    this.innerWidth = window.innerWidth;
    if (this.innerWidth <= 768) {
      this.isMobileView = true;
      if (!this.showregpage && !this.showdompage && !this.showloadingdomainsPage && !this.showDomainPage) {
        this.showmainpage = true;
        this.showregpage = false;
        this.showdompage = false;
      }
    }
  }
  ngOnInit() {
    this.countryListSupport = this.countryList;
    // this.backtoregpage();
    this.onResize();
    this.tabValue = this.loaderService.getOption();
    this.tabValue = this.tabValue !== undefined ? this.tabValue : 0;
    if (this.tabValue === 3) {
      this.showregpage = false;
      this.showdompage = true;
      this.showmainpage = false;
    }
    if (this.tabValue === 3) {
      this.showloadingdomainsPage = false;
      this.showDomainPage = true;
      this.showDetailsPage = false;
      this.showProfilePage = false;
    }
    this.detailsObj.countrycode = '';
    this.houmInfo = {
      name: 'loremipsum.in',
      storage: { value: '100', notation: 'GB', type: 'Default Storage' }
    };

    this.paymentVals = [
      { type: 'One-time Fixed cost', val: '10$' },
      { type: 'Monthly Subscription Cost', val: '0$' },
      { type: 'Taxes and fees', val: '5$' },
      { type: 'Total', val: '15$' }
    ];
    // this.getfreeDomains();
    this.paidList = this.domainsPaidList;
    if (this.baseService.houmObj.paymentPage) {
      this.contactObj = Object.assign({}, this.baseService.houmObj.contact);
      this.filterText = this.baseService.houmObj.domainName;
      this.paidDomainIndex = 0;
      this.filterText = ''; this.domainsPaidList = [];
      this.savereg(this.contactObj);
      this.baseService.houmObj.paymentPage = undefined;
    }
  }

  getPaidDomains(data) {
    if (this.holdSearch) {
      return false;
    }
    this.baseService.doRequest(`${this.apigw}/search_domain`,
      'post', {
      country: data.country,
      firstName: data.firstName, lastName: data.lastName, page: this.paidDomainIndex, searchtype: 'Paid',
      pageSize: this.paidDomainSize
    }).subscribe(resp => {
      if (resp.status) {
        if (resp.msg.length === 0) {
          return false;
        }
        if (this.paidDomainIndex === 100) {
          return false;
        }
        resp.msg.forEach(obj => {
          obj.discount_price = this.showDiscountPrice(obj);
          if (obj.discount_price > 0) {
            this.domainsPaidList.push(obj);
          }
        });
        this.paidList = this.domainsPaidList;
        this.showloadingdomains = false;
        this.paidDomainIndex++;
        this.getPaidDomains(data);
      } else {
        this.domainsPaidList = [];
      }
    });
  }

  getfreeDomains() {
    this.domainsList = [
      { domainName: 'loremlpsum.earth', value: 2, price1: '19.10' },
      { domainName: 'loremlpsum.land', value: 3, price1: '7.10' },
      { domainName: 'loremlpsum.me', value: 1, price1: '27.10' },
      { domainName: 'loremlpsum.world', value: 4, price1: '77.10' },
      { domainName: 'loremlpsum.live', value: 5, price1: '15.10' },
      { domainName: 'loremlpsum.cloud', value: 6, price1: '47.10' },
    ];
  }

  descsortFloat(a, b) {
    return b.discount_price - a.discount_price;
  }

  ascsortFloat(a, b) {
    return a.discount_price - b.discount_price;
  }
  loadPaidList() {
    this.showPaidList = !this.showPaidList;
    this.showNoDomainText = false; this.searchResult = ''; this.filterText = '';
    if (this.showPaidList) {
      /* this.showloadingdomains = true; */
      this.showButtonText = 'SHOW FREE OPTIONS';
      this.buildPaidbutton = undefined;
    } else {
      this.doFilter(undefined);
      this.showButtonText = 'SHOW MORE OPTIONS';
      this.buildFreebutton = undefined;
    }
  }

  saveDetails(data: any) {
    this.showPaidList = false;
    this.emailErrorMsg = '';
    this.showButtonText = 'SHOW MORE OPTIONS';
    if (this.loaderenable) {
      return false;
    }
    this.firstCheck(this.firstName.nativeElement);
    this.countryCheck(this.country.nativeElement);
    if (this.firstErrorMsg === '' && this.emailErrorMsg === '' && this.countryErrorMsg === '') {
      this.contactObj = new ContactInfo();
      this.contactObj = data;
      this.loaderenable = true;
      this.emailErrorMsg = '';
      this.baseService.doRequest(`${this.apigw}/check_email`, 'post', { email: data.emailId }).subscribe(resp => {
        if (resp.status) {
          this.loaderenable = false;
          this.showDomainPage = false;
          this.showProfilePage = false;
          this.showregpage = false;
          this.emailErrorMsg = '';
          this.showloadingdomainsPage = true;
          this.showloadingdomains = true;
          this.baseService.doRequest(`${this.apigw}/tax_details`, 'post', { country: this.contactObj.country })
            .subscribe(result => {
              /*const result = {"msg": {"conversionToUsd": 70.75, "currency": "INR", "indicator": "₹", "tax": 18}, "status": true}*/
              if (result.status) {
                this.baseService.countryWiseTax[this.contactObj.country] = result.msg;
                localStorage.setItem('country', this.contactObj.country);
                this.savereg(data);
              } else {
                console.log(result.msg);
              }
            });
        } else {
          this.loaderenable = false;
          this.emailErrorMsg = resp.msg;
          this.enableButton = false;
          this.setBorderCol(this.emailId.nativeElement, true);
        }
      });
    }
  }
  showDiscountPrice(domain) {
    const dmn = domain.domainName.split('.');
    dmn.splice(0, 1);
    const price = this.freeDoaminList[dmn.join('.')];
    if (price === undefined) {
      return domain.price; // +(domain.price * this.baseService.countryWiseTax[this.contactObj.country].conversionToUsd).toFixed(2);
    } else {
      return price;
    }
  }
  getFreeTlds() {
    this.baseService.doRequest(`${this.apigw}/get_freetlds`, 'post').subscribe(result => {
      if (result.status) {
        this.baseService.houmObj.freeTlds = result.msg;
      }
    });
  }
  savereg(data) {
    // {'firstName':'priya','lastName':'g', 'country': 'Guinea', 'page': 0, 'pageSize': 14, 'searchtype': 'Free/Paid'}
    this.baseService.houmObj.currency = this.baseService.countryWiseTax[this.contactObj.country].currency;
    this.baseService.houmObj.indicator = this.baseService.countryWiseTax[this.contactObj.country].indicator;
    this.baseService.doRequest(`${this.apigw}/search_domain`,
      'post', {
      firstName: data.firstName, lastName: data.lastName, country: this.contactObj.country,
      page: 0, pageSize: 8, searchtype: 'Free'
    }).subscribe(resp => {
      if (resp.status) {
        this.freeDoaminList = {};
        resp.msg.forEach(obj => {
          const domain = obj.domainName.split('.');
          domain.splice(0, 1);
          this.freeDoaminList[domain.join('.')] = obj.discount_price;
        });
        this.domainsList = resp.msg;
        if (this.domainsList && this.domainsList.length > 6) {
          this.domainsList = this.domainsList.slice(0, 6);
        }
        this.showloadingdomainsPage = false;
        this.showloadingdomains = false;
        this.loaderenable = false;
        this.showDomainPage = true;
        this.showProfilePage = false;
        this.showDetailsPage = false;
        this.enableprofileTick = true;
        this.showmainpage = false;
        this.showregpage = false;
        this.showdompage = true;
        this.paidDomainIndex = 0;
        this.filterText = ''; this.domainsPaidList = [];
        this.holdSearch = false;
        this.getPaidDomains(data);
      } else {
        this.showloadingdomainsPage = false;
      }
    });
  }
  enableFreeBuildButton(index, data) {
    this.buildFreebutton = index;
    this.freedata = data;
  }
  enablePaidBuildButton(index, data) {
    this.buildPaidbutton = index;
    this.paiddata = data;
  }
  saveFreeDomain(data: any) {
    this.loaderenable = true;
    setTimeout(() => {
      this.showfreeloader = true;
      const freeData = data;
      this.baseService.houmObj = data;
      this.loaderenable = false;
      this.baseService.houmObj.freeDomain = Object.assign({}, freeData);
      this.baseService.houmObj.contact = Object.assign({}, this.contactObj);
      console.log(this.baseService.houmObj);
      this.showDetailsPage = false;
      this.showDomainPage = false;
      this.showProfilePage = false;
      this.enableprofileTick = true;
      this.enabledomainTick = true;
      this.router.navigateByUrl('/payment/' + data.domainName);
    }, 1000);
  }

  public getLocation() {
    if (localStorage.getItem('country') !== undefined && localStorage.getItem('country')
      !== '' && localStorage.getItem('country') !== null) {
      this.contactObj.country = localStorage.getItem('country');
      return false;
    }
    /*this.baseService.doRequest('https://extreme-ip-lookup.com/json/', 'get').subscribe(result => {
      this.contactObj.country = result['country'];
    });*/
    this.baseService.doRequest('/capi', 'get').subscribe(result => {
      if (result.status) {
        this.contactObj.country = result.msg.country;
      }
    });
    /*fetch('https://extreme-ip-lookup.com/json/')
      .then(res => res.json())
      .then(response => {
        this.contactObj.country = response.country;
      })
      .catch(() => {
        console.log('Request failed');
      });*/
    /*this.baseService.doRequest('https://api.ipify.org?format=json', 'get').subscribe(result => {
      const data = result;
      this.baseService.doRequest(`https://www.iplocate.io/api/lookup/${data['ip']}`, 'get').subscribe(res => {
        const redData = res;
      });
    });*/
  }
  taxCalculate() {
    this.baseService.houmObj.currency = this.baseService.countryWiseTax[this.contactObj.country].currency;
    this.baseService.houmObj.price = this.baseService.houmObj.price; // +(this.baseService.houmObj.price *
    // this.baseService.countryWiseTax[this.contactObj.country].conversionToUsd).toFixed(2);
    this.baseService.houmObj.tax = +((this.baseService.countryWiseTax[this.contactObj.country].tax
      * this.baseService.houmObj.price) / 100).toFixed(2);
    this.baseService.houmObj.total = +(this.baseService.houmObj.price + this.baseService.houmObj.tax).toFixed(2);
    if (this.contactObj.country === 'India') {
      this.baseService.doRequest(`${this.apigw}/get_order`, 'post',
        {
          domain: this.baseService.houmObj.domainName, country: this.contactObj.country,
          totalAmount: this.baseService.houmObj.totalAmount, tax: this.baseService.houmObj.tax
        })
        .subscribe(result => {
          if (result.status) {
            this.baseService.houmObj.order_id = result.msg.id;
            this.loaderenable = false;
            this.router.navigateByUrl('/payment/' + this.baseService.houmObj.domainName);
            // Calculating Tax
          } else {
            this.loaderenable = false;
            alert('Payment Error');
          }
        });
    } else {
      this.loaderenable = false;
      this.router.navigateByUrl('/payment/' + this.baseService.houmObj.domainName);
    }
  }
  savePaidDomain(data: any) {
    if (this.loaderenable) {
      return false;
    }
    if (data.discount_price === 0) {
      this.saveFreeDomain(data);
      return false;
    }
    this.baseService.houmObj.freeDomain = undefined;
    this.loaderenable = true;
    setTimeout(() => {
      this.baseService.houmObj = data;
      this.baseService.houmObj.contact = Object.assign({}, this.contactObj);
      this.showpaidloader = true;
      this.showDetailsPage = false;
      this.showDomainPage = true;
      this.showProfilePage = false;
      this.enableprofileTick = true;
      this.enabledomainTick = true;
      this.showpaidloader = false;
      this.taxCalculate();
    }, 1000);
  }
  backtoMainpage() {
    if (!this.showDomainPage) {
      if (this.showloadingdomainsPage) {
        this.showloadingdomainsPage = false;
        this.showProfilePage = true;
      } else {
        this.router.navigateByUrl('/houm');
      }
    } else {
      this.showDomainPage = false;
      this.showProfilePage = true;
    }
  }
  buildPHoum(data: any) {
    if (data.password !== data.repassword) {
      this.toastr.error(`Passwords's mismatch`);
    } else {
      this.router.navigateByUrl('/payment');
    }
  }
  toggleArrowButton() {
    this.isSortType = !this.isSortType;
    this.buildPaidbutton = undefined;
    if (this.isSortType) {
      this.sortarrow = 'fa fa-angle-down';
      this.domainsPaidList.sort(this.descsortFloat);
    } else {
      this.sortarrow = 'fa fa-angle-up';
      this.domainsPaidList.sort(this.ascsortFloat);
    }
  }
  togglePasswordFieldType() {
    this.isTextFieldType = !this.isTextFieldType;

    if (this.isTextFieldType) {
      this.icon = 'fa fa-eye-slash';
    } else {
      this.icon = 'fa fa-eye';
    }
  }
  toggleRePasswordFieldType() {
    this.isReTextFieldType = !this.isReTextFieldType;
    if (this.isReTextFieldType) {
      this.icon1 = 'fa fa-eye-slash';
    } else {
      this.icon1 = 'fa fa-eye';
    }
  }
  doFilter = (value: string) => {
    this.holdSearch = true;
    const specialChars = '[^A-Za-z0-9 \S||\.||_]';
    const whiteSpace = /^\s*$/;
    if (value !== undefined && value.match(whiteSpace)) {
      this.searchResult = 'WhiteSpaces are not allowed';
      this.showNoDomainText = true;
      return false;
    } else if (value !== undefined && value.match(specialChars)) {
      this.searchResult = 'Special Characters are not allowed';
      this.showNoDomainText = true;
      return false;
    }
    if (value !== undefined && value !== '') {
      if (value.indexOf('.') === -1) {
        const cObj = Object.assign({}, this.contactObj);
        this.paidDomainIndex = 0;
        this.loadPaidList();
        this.showDomainPage = false;
        this.showdompage = false;
        this.showloadingdomainsPage = true;
        this.showloadingdomains = true;
        cObj.firstName = value;
        cObj.lastName = '';
        this.savereg(cObj);
        this.domainsPaidList = [];
        return false;
      } else {
        this.searchResult = '';
        this.showNoDomainText = false;
        /*this.showloadingdomains = true;*/
        this.paidDomainIndex = 100;
        this.usrSearchLoading = true;
        this.baseService.doRequest(`${this.apigw}/search_userdomain`, 'post', {
          firstName: this.contactObj.firstName, lastName: this.contactObj.lastName, country: this.contactObj.country, domain: value
        }).subscribe(resp => {
          this.usrSearchLoading = false;
          if (resp.status) {
            this.domainsPaidList = [];
            resp.msg.forEach(obj => {
              obj.discount_price = this.showDiscountPrice(obj);
              // if (obj.discount_price > 0) {
              this.domainsPaidList.push(obj);
              // }
            });
            // this.domainsPaidList = resp.msg;
            /*if (this.domainsPaidList && this.domainsPaidList.length > 6) {
              this.domainsPaidList = this.domainsPaidList.slice(0, 6);
            }*/
            if (this.domainsPaidList.length === 0) {
              this.searchResult = value + ` domain is not available`;
              this.showNoDomainText = true;
            }
            /* else {
                          this.domainsPaidList = this.domainsPaidList.filter(x => x.name.includes(value));
                        }*/
            this.showloadingdomainsPage = false;
            this.showloadingdomains = false;
            this.loaderenable = false;
            this.showDomainPage = true;
            this.showProfilePage = false;
            this.showDetailsPage = false;
            this.enableprofileTick = true;
            this.showmainpage = false;
            this.showregpage = false;
            this.showdompage = true;
          } else {
            this.domainsPaidList = [];
            if (this.domainsPaidList.length === 0) {
              this.searchResult = value + ` domain is not available`;
              this.showNoDomainText = true;
            }
          }
        });
      }
    } else {
      this.domainsPaidList = this.paidList;
      this.showNoDomainText = false;
    }
  }
  verifyFillInputs() {
    if (this.contactObj.firstName && this.contactObj.emailId && this.contactObj.country) {
      if (this.contactObj.emailId && !String(this.contactObj.emailId).match(this.EmailID_REGX)) {
        this.enableButton = false;
        this.invalidEmail = true;
      } else {
        this.enableButton = true;
        this.invalidEmail = false;
      }
    } else {
      this.enableButton = false;
      this.invalidEmail = false;
    }
  }
  emailCheck(ele) {
    this.emailErrorMsg = '';
    const val = this.trimming_fn(ele.value);
    // if (!val) {
    //   this.emailErrorMsg = 'Required';
    //   this.enableButton = false;
    //   this.setBorderCol(ele, true);
    // } else {
    //   if (val && !String(val).match(this.EmailID_REGX)) {
    //     ele.focus();
    //     this.emailErrorMsg = 'Invalid Email';
    //     this.enableButton = false;
    //     this.setBorderCol(ele, true);
    //     return false;
    //   } else {
    //     this.setBorderCol(ele, false);
    //     this.emailErrorMsg = '';
    //     this.verifyFillInputs();
    //   }
    // }
    if (!val) {
      this.emailErrorMsg = 'Required';
      this.enableButton = false;
      this.setBorderCol(ele, true);
    } else {
      this.filterEmailUpdate.pipe(
        debounceTime(3000),
        distinctUntilChanged())
        .subscribe(value => {
          this.baseService.doRequest(`${this.apigw}/check_email`, 'post', { email: val }).subscribe(resp => {
            if (resp.status) {
              this.emailErrorMsg = '';

            } else {
              this.emailErrorMsg = resp.msg;
              this.setBorderCol(this.emailId.nativeElement, true);
              this.verifyFillInputs();
            }
          });
        });
    }

  }
  firstCheck(ele) {
    const val = this.trimming_fn(ele.value);
    if (!val) {
      this.firstErrorMsg = 'Required';
      this.enableButton = false;
      this.setBorderCol(ele, true);
    } else {
      this.setBorderCol(ele, false);
      this.firstErrorMsg = '';
      this.verifyFillInputs();
    }
  }

  countryCheck(ele) {
    const val = this.trimming_fn(ele.value);
    if (!val) {
      this.countryErrorMsg = 'Required';
      this.enableButton = false;
      this.setBorderCol(ele, true);
    } else {
      const result = this.search(val, this.countryListSupport);
      if (result === true) {
        this.setBorderCol(ele, false);
        this.countryErrorMsg = '';
        this.verifyFillInputs();
      } else {
        this.countryErrorMsg = 'Select country from list';
        this.enableButton = false;
        this.setBorderCol(ele, true);
      }
    }
  }

  search(nameKey, myArray) {
    for (let i = 0; i < myArray.length; i++) {
      if (myArray[i].name === nameKey) {
        return true;
      }
    }
  }
  updateList(eve: any) {
    let name = this.contactObj.country;
    if (eve.key === 'Backspace') {
      name = this.contactObj.country.substring(0, this.contactObj.country.length - 1);
    } else {
      name += eve.key;
    }
    this.countryList = this.countryListSupport.filter(x => x.name.toLowerCase().startsWith(name.toLowerCase()));
  }

  trimming_fn(x) {
    return x ? x.replace(/^\s+|\s+$/gm, '') : '';
  }
  setBorderCol(ele, flag) {
    if (flag) {
      ele.style.border = '1px solid #ff5f5f';
      ele.style.boxShadow = '0 0 5px 0 #fc5e5e';
    } else {
      ele.style.border = '';
      ele.style.boxShadow = '';
    }
  }
  shownext() {
    this.showmainpage = false;
    this.showregpage = true;
  }
  backtomainpage() {
    this.showmainpage = true;
    this.showregpage = false;
  }
  backtoregpage() {
    this.showregpage = true;
    this.showPaidList = false;
    this.showdompage = false;
    this.showmainpage = false;
    this.showloadingdomains = false;
  }
}
export class ContactInfo {
  firstName: string;
  lastName: string;
  emailId: string;
  country: string;
}
export class DetailsInfo {
  password: string;
  repassword: string;
  emailId: string;
  countrycode: string;
  mobileNumber: string;
  address: string;
  city: string;
  pincode: string;
  country: string;
}
