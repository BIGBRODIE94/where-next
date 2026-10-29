export type Airport = {
  iata: string
  city: string
  name: string
}

type AirportRow = readonly [string, string, string]

const RAW: readonly AirportRow[] = [
  ['ABE', 'Allentown', 'Lehigh Valley International'],
  ['ABQ', 'Albuquerque', 'Albuquerque International Sunport'],
  ['ACY', 'Atlantic City', 'Atlantic City International'],
  ['ALB', 'Albany', 'Albany International'],
  ['AMA', 'Amarillo', 'Rick Husband Amarillo International'],
  ['ANC', 'Anchorage', 'Ted Stevens Anchorage International'],
  ['ASE', 'Aspen', 'Aspen/Pitkin County'],
  ['ATL', 'Atlanta', 'Hartsfield-Jackson Atlanta International'],
  ['ATW', 'Appleton', 'Appleton International'],
  ['AUS', 'Austin', 'Austin-Bergstrom International'],
  ['AVL', 'Asheville', 'Asheville Regional'],
  ['AVP', 'Wilkes-Barre', 'Wilkes-Barre/Scranton International'],
  ['AZA', 'Phoenix', 'Phoenix-Mesa Gateway'],
  ['BDL', 'Hartford', 'Bradley International'],
  ['BGR', 'Bangor', 'Bangor International'],
  ['BHM', 'Birmingham', 'Birmingham-Shuttlesworth International'],
  ['BIL', 'Billings', 'Billings Logan International'],
  ['BIS', 'Bismarck', 'Bismarck Municipal'],
  ['BNA', 'Nashville', 'Nashville International'],
  ['BOI', 'Boise', 'Boise Airport'],
  ['BOS', 'Boston', 'Boston Logan International'],
  ['BQN', 'Aguadilla', 'Rafael Hernandez'],
  ['BTR', 'Baton Rouge', 'Baton Rouge Metropolitan'],
  ['BTV', 'Burlington', 'Burlington International'],
  ['BUF', 'Buffalo', 'Buffalo Niagara International'],
  ['BUR', 'Burbank', 'Hollywood Burbank'],
  ['BWI', 'Baltimore', 'Baltimore/Washington International'],
  ['BZN', 'Bozeman', 'Bozeman Yellowstone International'],
  ['CAE', 'Columbia', 'Columbia Metropolitan'],
  ['CAK', 'Akron', 'Akron-Canton'],
  ['CHA', 'Chattanooga', 'Chattanooga Metropolitan'],
  ['CHO', 'Charlottesville', 'Charlottesville-Albemarle'],
  ['CHS', 'Charleston', 'Charleston International'],
  ['CID', 'Cedar Rapids', 'The Eastern Iowa'],
  ['CLE', 'Cleveland', 'Cleveland Hopkins International'],
  ['CLT', 'Charlotte', 'Charlotte Douglas International'],
  ['CMH', 'Columbus', 'John Glenn Columbus International'],
  ['COS', 'Colorado Springs', 'Colorado Springs Airport'],
  ['CPR', 'Casper', 'Casper/Natrona County International'],
  ['CRP', 'Corpus Christi', 'Corpus Christi International'],
  ['CRW', 'Charleston', 'Yeager'],
  ['CVG', 'Cincinnati', 'Cincinnati/Northern Kentucky International'],
  ['DAB', 'Daytona Beach', 'Daytona Beach International'],
  ['DAL', 'Dallas', 'Dallas Love Field'],
  ['DAY', 'Dayton', 'Dayton International'],
  ['DCA', 'Washington', 'Ronald Reagan Washington National'],
  ['DEN', 'Denver', 'Denver International'],
  ['DFW', 'Dallas', 'Dallas/Fort Worth International'],
  ['DLH', 'Duluth', 'Duluth International'],
  ['DRO', 'Durango', 'Durango-La Plata County'],
  ['DSM', 'Des Moines', 'Des Moines International'],
  ['DTW', 'Detroit', 'Detroit Metropolitan Wayne County'],
  ['ECP', 'Panama City', 'Northwest Florida Beaches International'],
  ['EGE', 'Vail', 'Eagle County Regional'],
  ['ELP', 'El Paso', 'El Paso International'],
  ['ERI', 'Erie', 'Erie International'],
  ['EUG', 'Eugene', 'Eugene Airport'],
  ['EVV', 'Evansville', 'Evansville Regional'],
  ['EWR', 'Newark', 'Newark Liberty International'],
  ['EYW', 'Key West', 'Key West International'],
  ['FAI', 'Fairbanks', 'Fairbanks International'],
  ['FAR', 'Fargo', 'Hector International'],
  ['FAT', 'Fresno', 'Fresno Yosemite International'],
  ['FAY', 'Fayetteville', 'Fayetteville Regional'],
  ['FCA', 'Kalispell', 'Glacier Park International'],
  ['FLL', 'Fort Lauderdale', 'Fort Lauderdale-Hollywood International'],
  ['FNT', 'Flint', 'Bishop International'],
  ['FSD', 'Sioux Falls', 'Sioux Falls Regional'],
  ['FWA', 'Fort Wayne', 'Fort Wayne International'],
  ['GEG', 'Spokane', 'Spokane International'],
  ['GJT', 'Grand Junction', 'Grand Junction Regional'],
  ['GNV', 'Gainesville', 'Gainesville Regional'],
  ['GPT', 'Gulfport', 'Gulfport-Biloxi International'],
  ['GRB', 'Green Bay', 'Green Bay Austin Straubel International'],
  ['GRR', 'Grand Rapids', 'Gerald R. Ford International'],
  ['GSO', 'Greensboro', 'Piedmont Triad International'],
  ['GSP', 'Greenville', 'Greenville-Spartanburg International'],
  ['GTF', 'Great Falls', 'Great Falls International'],
  ['GUM', 'Guam', 'Antonio B. Won Pat International'],
  ['HDN', 'Hayden', 'Yampa Valley'],
  ['HHH', 'Hilton Head', 'Hilton Head Island'],
  ['HLN', 'Helena', 'Helena Regional'],
  ['HNL', 'Honolulu', 'Daniel K. Inouye International'],
  ['HOU', 'Houston', 'William P. Hobby'],
  ['HPN', 'White Plains', 'Westchester County'],
  ['HRL', 'Harlingen', 'Valley International'],
  ['HSV', 'Huntsville', 'Huntsville International'],
  ['HVN', 'New Haven', 'Tweed New Haven'],
  ['IAD', 'Washington', 'Washington Dulles International'],
  ['IAH', 'Houston', 'George Bush Intercontinental'],
  ['ICT', 'Wichita', 'Wichita Dwight D. Eisenhower National'],
  ['IDA', 'Idaho Falls', 'Idaho Falls Regional'],
  ['ILM', 'Wilmington', 'Wilmington International'],
  ['IND', 'Indianapolis', 'Indianapolis International'],
  ['ISP', 'Islip', 'Long Island MacArthur'],
  ['ITH', 'Ithaca', 'Ithaca Tompkins International'],
  ['ITO', 'Hilo', 'Hilo International'],
  ['JAC', 'Jackson', 'Jackson Hole'],
  ['JAN', 'Jackson', 'Jackson-Medgar Wiley Evers International'],
  ['JAX', 'Jacksonville', 'Jacksonville International'],
  ['JFK', 'New York', 'John F. Kennedy International'],
  ['JNU', 'Juneau', 'Juneau International'],
  ['KOA', 'Kailua-Kona', 'Ellison Onizuka Kona International'],
  ['LAN', 'Lansing', 'Capital Region International'],
  ['LAS', 'Las Vegas', 'Harry Reid International'],
  ['LAX', 'Los Angeles', 'Los Angeles International'],
  ['LBB', 'Lubbock', 'Lubbock Preston Smith International'],
  ['LEX', 'Lexington', 'Blue Grass'],
  ['LFT', 'Lafayette', 'Lafayette Regional'],
  ['LGA', 'New York', 'LaGuardia'],
  ['LGB', 'Long Beach', 'Long Beach Airport'],
  ['LIH', 'Lihue', 'Lihue Airport'],
  ['LIT', 'Little Rock', 'Bill and Hillary Clinton National'],
  ['LNK', 'Lincoln', 'Lincoln Airport'],
  ['MAF', 'Midland', 'Midland International Air and Space Port'],
  ['MCI', 'Kansas City', 'Kansas City International'],
  ['MCO', 'Orlando', 'Orlando International'],
  ['MDT', 'Harrisburg', 'Harrisburg International'],
  ['MDW', 'Chicago', 'Chicago Midway International'],
  ['MEM', 'Memphis', 'Memphis International'],
  ['MFE', 'McAllen', 'McAllen International'],
  ['MFR', 'Medford', 'Rogue Valley International-Medford'],
  ['MHT', 'Manchester', 'Manchester-Boston Regional'],
  ['MIA', 'Miami', 'Miami International'],
  ['MKE', 'Milwaukee', 'Milwaukee Mitchell International'],
  ['MLB', 'Melbourne', 'Melbourne Orlando International'],
  ['MLI', 'Moline', 'Quad Cities International'],
  ['MOB', 'Mobile', 'Mobile Regional'],
  ['MRY', 'Monterey', 'Monterey Regional'],
  ['MSN', 'Madison', 'Dane County Regional'],
  ['MSO', 'Missoula', 'Missoula Montana'],
  ['MSP', 'Minneapolis', 'Minneapolis-Saint Paul International'],
  ['MSY', 'New Orleans', 'Louis Armstrong New Orleans International'],
  ['MTJ', 'Montrose', 'Montrose Regional'],
  ['MYR', 'Myrtle Beach', 'Myrtle Beach International'],
  ['OAK', 'Oakland', 'San Francisco Bay Oakland International'],
  ['OGG', 'Kahului', 'Kahului Airport'],
  ['OKC', 'Oklahoma City', 'Will Rogers World'],
  ['OMA', 'Omaha', 'Eppley Airfield'],
  ['ONT', 'Ontario', 'Ontario International'],
  ['ORD', 'Chicago', "O'Hare International"],
  ['ORF', 'Norfolk', 'Norfolk International'],
  ['ORH', 'Worcester', 'Worcester Regional'],
  ['PBI', 'West Palm Beach', 'Palm Beach International'],
  ['PDX', 'Portland', 'Portland International'],
  ['PHL', 'Philadelphia', 'Philadelphia International'],
  ['PHX', 'Phoenix', 'Phoenix Sky Harbor International'],
  ['PIA', 'Peoria', 'General Wayne A. Downing Peoria International'],
  ['PIE', 'St. Petersburg', 'St. Pete-Clearwater International'],
  ['PIT', 'Pittsburgh', 'Pittsburgh International'],
  ['PNS', 'Pensacola', 'Pensacola International'],
  ['PSC', 'Pasco', 'Tri-Cities'],
  ['PSP', 'Palm Springs', 'Palm Springs International'],
  ['PVD', 'Providence', 'Rhode Island T.F. Green International'],
  ['PWM', 'Portland', 'Portland International Jetport'],
  ['RAP', 'Rapid City', 'Rapid City Regional'],
  ['RDM', 'Redmond', 'Roberts Field'],
  ['RDU', 'Raleigh', 'Raleigh-Durham International'],
  ['RFD', 'Rockford', 'Chicago Rockford International'],
  ['RIC', 'Richmond', 'Richmond International'],
  ['RNO', 'Reno', 'Reno-Tahoe International'],
  ['ROA', 'Roanoke', 'Roanoke-Blacksburg Regional'],
  ['ROC', 'Rochester', 'Greater Rochester International'],
  ['RST', 'Rochester', 'Rochester International'],
  ['RSW', 'Fort Myers', 'Southwest Florida International'],
  ['SAN', 'San Diego', 'San Diego International'],
  ['SAT', 'San Antonio', 'San Antonio International'],
  ['SAV', 'Savannah', 'Savannah/Hilton Head International'],
  ['SBA', 'Santa Barbara', 'Santa Barbara Municipal'],
  ['SBN', 'South Bend', 'South Bend International'],
  ['SBP', 'San Luis Obispo', 'San Luis Obispo County Regional'],
  ['SCE', 'State College', 'University Park'],
  ['SDF', 'Louisville', 'Louisville Muhammad Ali International'],
  ['SEA', 'Seattle', 'Seattle-Tacoma International'],
  ['SFB', 'Orlando', 'Orlando Sanford International'],
  ['SFO', 'San Francisco', 'San Francisco International'],
  ['SGF', 'Springfield', 'Springfield-Branson National'],
  ['SHV', 'Shreveport', 'Shreveport Regional'],
  ['SJC', 'San Jose', 'Norman Y. Mineta San Jose International'],
  ['SJU', 'San Juan', 'Luis Munoz Marin International'],
  ['SLC', 'Salt Lake City', 'Salt Lake City International'],
  ['SMF', 'Sacramento', 'Sacramento International'],
  ['SNA', 'Santa Ana', 'John Wayne Orange County'],
  ['SRQ', 'Sarasota', 'Sarasota-Bradenton International'],
  ['STL', 'St. Louis', 'St. Louis Lambert International'],
  ['STT', 'St. Thomas', 'Cyril E. King'],
  ['STX', 'St. Croix', 'Henry E. Rohlsen'],
  ['SUN', 'Hailey', 'Friedman Memorial'],
  ['SWF', 'Newburgh', 'New York Stewart International'],
  ['SYR', 'Syracuse', 'Syracuse Hancock International'],
  ['TLH', 'Tallahassee', 'Tallahassee International'],
  ['TPA', 'Tampa', 'Tampa International'],
  ['TRI', 'Bristol', 'Tri-Cities'],
  ['TTN', 'Trenton', 'Trenton-Mercer'],
  ['TUL', 'Tulsa', 'Tulsa International'],
  ['TUS', 'Tucson', 'Tucson International'],
  ['TVC', 'Traverse City', 'Cherry Capital'],
  ['TYS', 'Knoxville', 'McGhee Tyson'],
  ['VPS', 'Destin', 'Destin-Fort Walton Beach'],
  ['XNA', 'Bentonville', 'Northwest Arkansas National'],
]

const ALIASES: Record<string, string[]> = {
  LGA: ['laguardia', 'la guardia', 'la-guardia'],
  JFK: ['kennedy', 'jfk international'],
  EWR: ['newark'],
  ORD: ['ohare', "o'hare", 'o hare'],
  MDW: ['midway'],
  DCA: ['reagan', 'national'],
  IAD: ['dulles'],
  HOU: ['hobby'],
  IAH: ['intercontinental', 'bush'],
  DAL: ['love field'],
  SNA: ['orange county', 'john wayne'],
  BUR: ['burbank', 'hollywood burbank'],
  PHL: ['philly', 'philadelphia'],
  MCO: ['orlando'],
  FLL: ['fort lauderdale'],
  LAS: ['mccarran', 'harry reid'],
}

export const US_AIRPORTS: Airport[] = RAW.map(([iata, city, name]) => ({
  iata,
  city,
  name,
}))

export function formatAirport(airport: Airport): string {
  return `${airport.iata} — ${airport.city} (${airport.name})`
}

function haystack(airport: Airport): string {
  const extra = ALIASES[airport.iata]?.join(' ') ?? ''
  return `${airport.iata} ${airport.city} ${airport.name} ${extra}`.toLowerCase()
}

export function searchAirports(query: string, limit = 8): Airport[] {
  const needle = query.trim().toLowerCase()
  if (!needle) return US_AIRPORTS.slice(0, limit)

  const exact = US_AIRPORTS.filter((airport) => airport.iata.toLowerCase() === needle)
  if (exact.length) return exact

  const scored = US_AIRPORTS.map((airport) => {
    const iata = airport.iata.toLowerCase()
    const city = airport.city.toLowerCase()
    const blob = haystack(airport)
    let score = 0
    if (iata.startsWith(needle)) score = 100 - iata.length
    else if (city.startsWith(needle)) score = 80
    else if (blob.includes(needle)) score = 40
    return { airport, score }
  })
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score || a.airport.city.localeCompare(b.airport.city))

  return scored.slice(0, limit).map((row) => row.airport)
}

export function resolveAirport(input: string): Airport | undefined {
  const trimmed = input.trim()
  if (!trimmed) return undefined
  const code = trimmed.slice(0, 3).toUpperCase()
  if (/^[A-Z]{3}/.test(code)) {
    const byCode = US_AIRPORTS.find((airport) => airport.iata === code)
    if (byCode && (trimmed.length === 3 || trimmed.toUpperCase().startsWith(byCode.iata))) {
      return byCode
    }
  }
  const matches = searchAirports(trimmed, 1)
  return matches[0]
}
