package elastest.loganalyzer.es.client.rest;

import java.util.LinkedList;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import elastest.loganalyzer.es.client.DiffMatchPatch;
import elastest.loganalyzer.es.client.DiffMatchPatch.Diff;

@RestController
@RequestMapping("/diff")
public class DiffMatchPatchRest {

	private final DiffMatchPatch dmp = new DiffMatchPatch();

	@RequestMapping(value = "", method = RequestMethod.POST)
	public String get(@RequestBody String body) throws JSONException {
		JSONObject obj = new JSONObject(body);
		LinkedList<Diff> d = dmp.diff_main(obj.getString("text1"), obj.getString("text2"));
		dmp.diff_cleanupSemantic(d);
		return dmp.diff_prettyHtml(d);
	}
}
